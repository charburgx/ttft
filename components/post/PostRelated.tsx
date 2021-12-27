import React, { FunctionComponent } from 'react';
import Link from 'next/link'
import { Post } from '../../models/post';

interface OwnProps {
    posts?: Pick<Post, "title" | "slug">[]
}

type Props = OwnProps;

const PostRelated: FunctionComponent<Props> = ({posts}) => {
    if(!posts || posts.length == 0) return <></>

    return (<div className="w-full rounded-rc post-related">
        <div className="px-rcp py-1 bg-rc-hdr rounded-t-rc font-sans text-3xl text-bg-50">
            Similar Tools
        </div>

        <ul>
            {posts.map((post) => <li className="mb-0.5 last:mb-0 block">
                <Link href={`/post/${post.slug}`}><a className="text-bg-50 text-xl leading-5 bg-rc-content hover:bg-acc-2-dark p-rcp py-[1rem] inline-block w-full transition-colors duration-75">{post.title}</a></Link>
            </li>)}
        </ul>

        {/*<div className="bg-rc-content h-36" />*/}

        <div className="bg-rc-hdr h-4" />
    </div>);
};

export default PostRelated;
