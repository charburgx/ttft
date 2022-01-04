import useAxios from "axios-hooks";
import {useCallback, useContext, useEffect, useReducer, useState} from "react";
import axios, {Axios, AxiosError} from "axios";
import {removeNullOrEmpty} from "../helpers/helpers";
import { Post } from "../models/post";
import Fuse from 'fuse.js'
import { AuthContext } from "./user";

type GetPostsParams = {
    categories?: Nullable<string[]>
}

// type PageAxiosRes = UseAxiosResult<APIRes<Paginated<Post>>, APIError>
export type PostController = {
    posts: Post[],
    search: (query: string, categories: string[]) => void
    // posts: Post[],
    // fetch: (reset?: boolean, newParams?: object) => any,
    loading: boolean,
    // clear: () => any,
    // // setParams: (params: GetPostsParams, clear?: boolean) => any,
    // ended: () => boolean,
    error?: AxiosError<APIError>
}

// const POSTS_URI = '/api/posts'

function createPostsContext(first_posts: Post[]): PostController {
    const {loggedIn} = useContext(AuthContext)

    const [ srcPosts, setSrcPosts ] = useState<Post[]>(first_posts)
    const [ loading, setLoading ] = useState<boolean>(false)

    useEffect(() => {
        if(!loggedIn) return

        setLoading(true)

        axios.get<{data: Post[]}>('/api/admin/posts')
            .then(res => {
                setSrcPosts(res.data.data)
                setLoading(false)
            })
    }, [loggedIn])

    const [posts, setPosts] = useState<Post[]>(first_posts)

    const query = (val: string, categories: string[]) => {
        const sq = val ?? ''

        let p = srcPosts

        if(categories.length > 0) {
            p = p.filter(ps => ps.categories.some(cat => categories.includes(cat)))
        }

        if(sq !== '') {
            p = (new Fuse(p, { keys: [ 'title' ] }))
                .search(sq)
                .map(res => res.item)
        }

        setPosts(p)
    }

    return {
        posts: posts,
        search: query,
        loading: loading
    }

    // const [ nextUri, setNextUri ] = useState<string|undefined>(POSTS_URI);
    // const [ nextPage, setNextPage ] = useState<number | undefined>(1)
    // const [ params, setParams ] = useState<GetPostsParams>({})

    // const [posts, newPosts] = useReducer((state: Post[], { posts=[], clear }: { posts?: Post[], clear?: boolean }) => {
    //     if(clear) return [ ]

    //     // state.push(...posts)

    //     return [...state, ...posts]
    // }, [])

    // // const postsRes = useAxios<APIRes<Paginated<Post>>, any, APIError>({url: POSTS_URI, method: "get"}, {manual: true})

    // const fetch = postsRes[1]

    // const fetchPosts = (reset?: boolean, newParams?: object) => {
    //     if(!reset && !nextPage) return;
    //     if(postsRes[0].loading) return;

    //     if(reset) {
    //         newPosts({clear: true})
    //         setNextPage(1)
    //     }

    //     if(newParams) {
    //         removeNullOrEmpty(newParams)
    //         setParams(newParams)
    //     }

    //     fetch({url: POSTS_URI, params: {...(newParams ?? params), page: reset ? 1 : nextPage}, method: "get"})
    //         .then(({ data }) => {
    //             // setNextUri(data.next_page_url)
    //             const pageNext = data.current_page + 1
    //             setNextPage((pageNext > data.last_page) ? undefined : pageNext)
    //             newPosts({posts: data.data.hits})
    //         })
    //         .catch(res => console.log(res))
    // }

    // const clear = () => {
    //     newPosts({clear: true})
    //     // setNextUri(POSTS_URI)
    //     setNextPage(1)
    // }

    // const setParamsEx = (params: GetPostsParams, clearPosts: boolean = true) => {
    //     setParams(removeNullOrEmpty(params))
    //     if(clearPosts) {
    //         clear()
    //     }
    // }

    // return {
    //     posts: posts,
    //     fetch: fetchPosts,
    //     loading: postsRes[0].loading,
    //     error: postsRes[0].error ?? undefined,
    //     clear: clear,
    //     // setParams: setParamsEx,
    //     ended: (() => !nextPage)
    // }
}

export function post_image(post: Pick<Post, "slug"|"image">): string|undefined {
    if(!post.image) return undefined
    return `/storage/posts/${post.slug}/${post.image}`
}

export { createPostsContext }
