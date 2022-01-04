import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
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
import { AuthContext } from "api/user";
import postlist from "pages/api/admin/postlist";
import { getPost } from "server/db/posts";
import axios from "axios";
import PostAdminLinks from "components/post/PostAdminLinks";

export const getStaticProps: GetStaticProps = async (context) => {
    const db = await database()

    // const posts = await db.collection('posts')
    //     .find({slug: context.params!.slug})
    //     .limit(1)
    //     .project({ _id: 0, slug: 1, title: 1, image: 1, content: 1, published_at: 1, created_at: 1, uploaded_at: 1, categories: 1, relatedPosts: 1, draft: 1 })
    //     .toArray()

    // const post_og = posts[0]

    // post_og.relatedPosts = await db.collection('posts')
    //     .find({_id: { "$in": post_og.relatedPosts }})
    //     .limit(5)
    //     .project({ _id: 0, title: 1, slug: 1 })
    //     .toArray()

    const post_og = await getPost(db, context.params!.slug as string)

    const post = !post_og?.draft ? post_og : undefined

    return {
        props: {
            post,
            slug: context.params!.slug as string,
            exists: !!post_og
        },
        revalidate: 60
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const db = await database()

    const slugs = (await db.collection('posts')
        .find({})
        .project({_id: 0, slug: 1})
        .toArray())
        .map(doc => doc.slug)

    return {
        paths: slugs.map(slug => ({ params: { slug: slug } })),
        fallback: true
    }
}

const PostPage: NextPage<{post: Post|undefined, slug: string, exists: boolean}> = ({post, slug, exists}) => {
    // const { slug } = useParams<{ slug?: string }>()
    // if(!slug) { return <Redirect to={"/"} /> }

    const { loggedIn } = useContext(AuthContext)
    const history = useRouter();

    if(!post && loggedIn === false) history.push("/")

    const [ data, setData ] = useState<Post|undefined>(post)
    const [ loading, setLoading ] = useState<boolean>(!post)

    useEffect(() => {
        setLoading(history.isFallback)
    }, [history.isFallback])

    useEffect(() => {
        if(exists === false) history.push("/")
    }, [exists])

    useEffect(() => {
        if(loggedIn !== true) return

        const controller = new AbortController()

        setLoading(true)

        axios.get<{data: Post}>('/api/admin/contentpost', { signal: controller.signal, params: { slug } })
            .then((res) => {
                setData(res.data.data)
            })
            .finally(() => {
                setLoading(false)
            })
 
        return () => controller.abort()
    }, [loggedIn])

    let error: {response: APIError}|undefined = undefined
    // const [{error, loading, data}, refetch] = useAxios<APIRes<Post>, APIError>({url: '/api/post', method: 'get', params: { 'slug': slug }})

    const content = useCallback(() => (data?.draft ? data?.draftContent : data?.content) ?? '', [data])
    
    const contentNoTags = () => content().replace(/(<([^>]+)>)/gi, "")
    const contentAbstract = () => contentNoTags().split("\n")[0]

    const category_text = () => {
        if(!data) return null
        if(data.draft) return "DRAFT"

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
                    <PostAdminLinks slug={slug}/>
                    <PostRelated posts={data?.relatedPosts}/>
                </>
            </PostSections>
        </> : ''}
    </>);
}

export default PostPage