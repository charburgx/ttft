import { UseAxiosResult } from 'axios-hooks'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { getPosts } from 'server/db/posts'
import { createPostsContext } from '../api/posts'
import { AuthController } from '../api/user'
import CategorySelect from '../components/CategorySelect'
import PostCards from '../components/home/PostCards'
import NavHeading from '../components/nav/NavHeading'
import { Category } from '../models/category'
import { Post } from '../models/post'
import { database } from '../server/db'

export const getStaticProps: GetStaticProps = async (context) => {
    const db = await database()

    const posts = await getPosts(db, {includeDrafts: false})

    // const posts = await db.collection('posts')
    //     .find({draft: false})
    //     .project({ _id: 0, image: 1, slug: 1, featured: 1, updated_at: 1, categories: 1, title: 1 })
    //     .sort({ age: -1, created_at: -1 })
    //     .toArray()

    const catlist = (await db.collection('categories')
        .find().toArray()).map(cat => cat.name)

    return {
        props: {
            posts: posts,
            categories: catlist
        }
    }
}

const ABOUT_TEXT = "This is a collection of mostly free web-based tools that will increase your own productivity and help you foster collaboration and creativity in the classroom."

const DESC_TEXT = "A collection of mostly free web-based tools that will increase your own productivity and help you foster collaboration and creativity in the classroom."

const Home: NextPage<{posts: Post[], categories: string[]}> = ({ posts: init_posts, categories: catlist }) => {
    const { posts, loading, error, search } = createPostsContext(init_posts)

    const [ categories, setCategories ] = useState<string[]>([])
    const [ searchRaw, setSearchRaw ] = useState<string>("")

    // const [ searchQueryString, setSearchQueryString ] = useState<string>("")

    useEffect(() => {
        // const searchTimeout = setTimeout(() => { setSearchQueryString(searchRaw) }, 200)
        // return () => clearTimeout(searchTimeout)

        search(searchRaw, categories)
    }, [searchRaw, categories])

    // useEffect(() => {
    //     fetch(true, {categories: categories, query: searchQueryString})
    //     return () => fetch(true, {})
    // }, [ categories, searchQueryString ])

    return (<>
        <NavHeading />

        <Head>
          <title>Tech Tools for Teachers</title>
          <meta name="description" content={DESC_TEXT} />
        </Head>

        <p className="font-sans-title text-4xl text-center mt-6 xl:mt-24 xl:text-5xl">
            Let the Learning Begin!
        </p>

        <p className="font-sans text-center mt-2 xl:mt-3 mb-16 xl:mb-32 xl:text-lg xl:max-w-[700px] lg:max-w-[600px] md:max-w-[500px] sm:max-w-[400px] max-w-[300px] mx-auto">
            {ABOUT_TEXT}
        </p>

        <div className="w-full mb-3">
            <div className="main-page-size sm:flex px-sm">
                <div className="sm:w-2/3 sm:pr-6 sm:mb-0 mb-6">
                    <input type="text" placeholder="find a tool..." value={searchRaw} onChange={e => setSearchRaw(e.target.value)}
                           className="text-3xl box-border w-full focus:outline-none border-b-[1px] border-black border-opacity-30 bg-none placeholder-shown:italic placeholder-opacity-40 placeholder-black font-sans text-black" />
                </div>

                <div className="sm:w-1/3">
                    <CategorySelect
                        onChange={setCategories}
                        catlist={catlist}
                        loading={false}
                    />
                </div>
            </div>
        </div>

        <div className="w-full min-h-[1000px]">
            <div className="main-page-size">
                {error ? <p className="text-center text-form-err-500">{error?.response?.data.message}</p> : ''}

                <PostCards posts={posts} loading={loading} />
            </div>
        </div>

        {/*<NavBar />*/}

        {/*<div className="w-auto mx-auto">*/}
        {/*    <p className="my-28 text-center w-full font-sans-title text-5xl text-main-300">*/}
        {/*    </p>*/}
        {/*</div>*/}

        {/*<PostCardSection posts={posts} />*/}

    </>);
}

export default Home
