import React, {FunctionComponent, useContext} from 'react';
import Link from "next/link"
import { AuthContext } from 'api/user';

interface OwnProps {
    slug?: string
}

type Props = OwnProps;

const PostAdminLinks: FunctionComponent<Props> = (props) => {
    const auth = useContext(AuthContext)

    return <>
        <div className="mb-5">
            {auth.loggedIn && props.slug ?
                <Link href={`/edit?slug=${props.slug}`}><a>Edit post</a></Link>
            : ''}
        </div>
    </>
};

export default PostAdminLinks;
