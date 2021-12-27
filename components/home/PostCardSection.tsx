import React, { FunctionComponent } from 'react';
import PostCards from "./PostCards";

interface OwnProps {
    posts: Post[]
}

type Props = OwnProps;

/**
 * @deprecated
 */
const PostCardSection: FunctionComponent<Props> = ({ posts }) => {
  return (<div className="bg-gray-900">
      {/* <PostCards posts={posts} /> */}
  </div>);
};

export default PostCardSection;
