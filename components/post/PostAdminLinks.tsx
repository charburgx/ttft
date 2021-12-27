import React, {FunctionComponent, useContext} from 'react';
import {AuthContext} from "../App";
import Link from "next/link"

interface OwnProps {
    id?: number
}

type Props = OwnProps;

const PostAdminLinks: FunctionComponent<Props> = (props) => {
    const auth = useContext(AuthContext)

    return <>
        <div className="mb-5">
            {auth.loggedIn() && props.id ?
                <Link href={`/edit/${props.id}`}>Edit post</Link>
            : ''}
        </div>
    </>
};

export default PostAdminLinks;
