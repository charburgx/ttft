import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import Loader from "../../components/Loader";
import NavHeading from "../../components/nav/NavHeading";
import PostComments from "../../components/post/PostComments";
import PostContent from "../../components/post/PostContent";
import PostHeader from "../../components/post/PostHeader";
import PostImage from "../../components/post/PostImage";
import PostRelated from "../../components/post/PostRelated";
import PostSections from "../../components/post/PostSections";
import { Post } from "../../models/post";
import { jsonLdScriptProps } from "react-schemaorg";
import { BlogPosting } from "schema-dts";
import { database } from "../../server/db";
import type { ObjectId } from 'mongodb'
import Head from 'next/head'

export const getStaticProps: GetStaticProps = async (context) => {
    const db = await database()

    const posts = await db.collection('posts')
        .find({slug: context.params!.slug})
        .limit(1)
        .project({ _id: 0, slug: 1, title: 1, image: 1, content: 1, published_at: 1, created_at: 1, uploaded_at: 1, categories: 1, relatedPosts: 1 })
        .toArray()

    const post = posts[0]

    post.relatedPosts = await db.collection('posts')
        .find({_id: { "$in": post.relatedPosts }})
        .limit(5)
        .project({ _id: 0, title: 1, slug: 1 })
        .toArray()

    return {
        props: {
            post
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const db = await database()

    const slugs = (await db.collection('posts')
        .find({draft: false})
        .project({_id: 0, slug: 1})
        .toArray())
        .map(doc => doc.slug)

    return {
        paths: slugs.map(slug => ({ params: { slug: slug } })),
        fallback: false
    }
}

const PostPage: NextPage<{post: Post}> = ({post: data}) => {
    // const { slug } = useParams<{ slug?: string }>()
    // if(!slug) { return <Redirect to={"/"} /> }

    const history = useRouter();
    const loading = false
    let error: {response: APIError}|undefined = undefined
    // const [{error, loading, data}, refetch] = useAxios<APIRes<Post>, APIError>({url: '/api/post', method: 'get', params: { 'slug': slug }})

    const content = useCallback(() => (data?.draft ? data?.draftContent : data?.content) ?? '', [data])
    
    const contentNoTags = () => content().replace(/(<([^>]+)>)/gi, "")
    const contentAbstract = () => contentNoTags().split("\n")[0]


    const category_text = () => {
        if(!data) return null
        if(data.draft) return "DRAFT"

        // @ts-ignore
        return data.categories.map(c => c.toUpperCase()).join(", ")
    }

    return (<>
        <NavHeading />

        {loading ? <><Head><title>Loading...</title></Head><Loader className="text-center"/></> : ''}
        
        {data ? <>
            <Head>
                <title>{data.title}</title>
                <script {...jsonLdScriptProps<BlogPosting>({
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    headline: data.title,
                    abstract: contentAbstract(),
                    articleBody: contentNoTags(),
                    author: "Raina Burditt",
                    datePublished: data.published_at ?? undefined,
                    image: data.image ?? undefined
                })} />
            </Head>

            <PostSections>
                <>
                    {category_text() ? <p className="">{category_text()}</p> : ''}
                    <PostHeader text={data.title}/>
                    <PostImage href={data.image}/> 
                    <PostContent html={content()}/>
                    <PostComments id={data.slug}/>
                </>
                <>
                    {/* <PostAdminLinks id={data.id}/> */}
                    <PostRelated posts={data?.relatedPosts}/>
                </>
            </PostSections>
        </> : ''}
    </>);
}

export default PostPage