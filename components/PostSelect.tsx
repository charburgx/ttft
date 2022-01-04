import React, {FunctionComponent, useCallback, useContext, useEffect} from 'react';
import useAxios from "axios-hooks";
import Select from "react-select";
import { Post } from 'models/post';

interface OwnProps {
    onChange(results: string[]): void,
    disabled?: boolean,
    value?: string[],
    postlist?: { _id: string, title: string }[],
    postlistLoading?: boolean
}

type Props = OwnProps;

const PostSelect: FunctionComponent<Props> = ({postlist, postlistLoading: loading, ...props}) => {
    // const [ { data: postlist, loading, error } ] = useAxios<Pick<Post, "title" | "_id">[], APIError>({ url: "/api/post/list" })

    useEffect(() => {
        console.log(postlist?.filter(post => !!post.title)?.map(post => ({ value: post._id, label: post.title })) ?? [])
    }, [postlist]);


    const options = useCallback(() => {
        return postlist?.filter(post => !!post.title)?.map(post => ({ value: post._id, label: post.title })) ?? []
    }, [postlist])

    return (<Select
        className="multiselect"
        classNamePrefix="multiselect"
        // @ts-ignore
        options={options()}
        isDisabled={props.disabled || loading}
        defaultValue={null}
        closeMenuOnSelect={false}
        isMulti={true}

        placeholder="Posts..."
        noOptionsMessage={() => null}
        // @ts-ignore
        onChange={(res) => props.onChange(res.map(obj => obj.value))}

        isClearable={true}
        value={options().filter(opt => props.value?.includes(opt.value))}
    />);
};

export default PostSelect;
