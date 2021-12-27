import React, { FunctionComponent } from 'react';

interface OwnProps {
    html: string
}

type Props = OwnProps;

const PostContent: FunctionComponent<Props> = (props) => {
  return (<div className="post-content headers" dangerouslySetInnerHTML={{__html: props.html}} />);
};

export default PostContent;
