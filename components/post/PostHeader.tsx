import React, { FunctionComponent } from 'react';

interface OwnProps {
    text: string
}

type Props = OwnProps;

const PostHeader: FunctionComponent<Props> = (props) => {
  return ( <h1 className="post-header">{props.text}</h1> );
};

export default PostHeader;
