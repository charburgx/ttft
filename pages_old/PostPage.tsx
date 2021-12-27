import React, {FunctionComponent, useCallback, useEffect} from 'react';
import useAxios from "axios-hooks";
import PostSections from "../components/post/PostSections";
import PostImage from "../components/post/PostImage";
import PostContent from "../components/post/PostContent";
import PostHeader from "../components/post/PostHeader";
import NavHeading from "../components/nav/NavHeading";
import PostRelated from "../components/post/PostRelated";
import PostAdminLinks from "../components/post/PostAdminLinks";
import PostComments from "../components/post/PostComments";
import {post_image} from "../api/posts";
import Loader from "../components/Loader";
import { jsonLdScriptProps } from "react-schemaorg";
import { BlogPosting } from "schema-dts";
import Head from 'next/head';
import { getURL } from '../api/url';
import { useRouter } from 'next/router';
import { Post } from '../models/post';

interface OwnProps {
    post: Post
}

type Props = OwnProps;

const PostPage: FunctionComponent<Props> = ({post: data}) => {
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
        return data.categories.map(c => c.name.toUpperCase()).join(", ")
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
};

export default PostPage;
