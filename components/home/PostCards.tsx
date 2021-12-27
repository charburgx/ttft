import React, { Fragment, FunctionComponent, useEffect, useState } from 'react';
import PostCard from "./PostCard";
import {Breakpoints} from "../../helpers/breakpoints";
import { Waypoint } from 'react-waypoint';
import Loader from "../Loader";
import {post_image} from "../../api/posts";
import { Post } from '../../models/post';
import Masonry from "react-masonry-css";

interface OwnProps {
    posts: Post[],
    load?: () => void,
    loading: boolean
    // numWords?: number
}

type Props = OwnProps;

const PostCards: FunctionComponent<Props> = ({ posts, load, loading }) => {
    const breakpointCols = {
        default: 3,
        [Breakpoints['lg']]: 3,
        [Breakpoints['md']]: 2,
        [Breakpoints['sm']]: 1
    }

  return ( <>
      <Masonry breakpointCols={breakpointCols}
               className="flex mx-auto -ml-sm px-sm"
               columnClassName="pl-sm mt-sm"
                >
          {
              posts.map((post, i) => <Fragment key={post.slug}>
                  { i+1 == posts.length ?
                      <Waypoint onEnter={load} /> : ''
                  }
                <PostCard
                    title={post.title}
                  //   content={post.content.split("<br/>")[0]}
                    slug={post.slug}
                    category_text={post.categories.join(", ")}
                    className={ ['', 'mx-auto', 'ml-auto'][i % 3] }
                    published_at={post.published_at}
                    draft={post.draft}
                    image_href={post.image}
                />
              </Fragment>)
          }
      </Masonry>
      {
        loading ? <Loader className="text-center" /> : ''
      }
  </>)
};

// <div className="mx-auto max-w-[300px] lg:max-w-[900px] md:max-w-screen-md sm:max-w-screen-sm">
//      {/*<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-4 gap-x-8 w-[90%] mx-auto auto-rows-min">*/}
//      {/*<div className="cols-3">*/}

export default PostCards;
