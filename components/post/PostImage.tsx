import React, { FunctionComponent } from 'react';

interface OwnProps {
    href?: string|null
}

type Props = OwnProps;

const PostImage: FunctionComponent<Props> = (props) => {
    if(!props.href) return <></>

    return (<div
        className="post-image-container"
        style={ { backgroundImage: `url('${props.href}')` } }
    />);
};

export default PostImage;
