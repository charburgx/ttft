import React, {FunctionComponent, useCallback, useContext, useEffect} from 'react';
import {CategoryListContext} from "./App";
import useAxios from "axios-hooks";
import Select from "react-select";

interface OwnProps {
    onChange(results: number[]): void,
    disabled?: boolean,
    value?: number[]
}

type Props = OwnProps;

const PostSelect: FunctionComponent<Props> = (props) => {
    const [ { data: postlist, loading, error } ] = useAxios<Pick<Post, "title" | "id">[], APIError>({ url: "/api/post/list" })

    useEffect(() => {
        console.log(postlist?.filter(post => !!post.title)?.map(post => ({ value: post.id, label: post.title })) ?? [])
    }, [postlist]);


    const options = useCallback(() => {
        return postlist?.filter(post => !!post.title)?.map(post => ({ value: post.id, label: post.title })) ?? []
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
