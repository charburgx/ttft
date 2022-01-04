import React, {FunctionComponent, useCallback, useContext, useEffect, useReducer, useState} from 'react';
import useAxios from "axios-hooks";
import Input from "../forms/Input";
import {ContentState, convertToRaw, EditorState} from "draft-js";
import type {Editor as EditorType} from "react-draft-wysiwyg";
import dynamic from 'next/dynamic'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import type htmlToDraftType from "html-to-draftjs";
import {removeCond, removeNullOrEmpty} from "../../helpers/helpers";
import CategorySelect from "../CategorySelect";
import Button from "../forms/Button";
import Checkbox from "../forms/Checkbox";
import PostSelect from "../PostSelect";
import TextArea from "../forms/TextArea";
import ImageUpload from "../forms/ImageUpload";
import {post_image} from "../../api/posts";
import FormMessage from "../forms/FormMessage";
import axios from 'axios';
import type {ObjectId} from 'mongodb'
import { Edit } from '../../models/edit';
import { useCategoryList } from 'client/categories';

let htmlToDraft: typeof htmlToDraftType

if(typeof window !== "undefined" && typeof window.navigator !== "undefined") {
    import("html-to-draftjs")
        .then(func => {
            // @ts-ignore
            htmlToDraft = func.default
        })
}

// @ts-ignore
const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), { ssr: false }) as unknown as EditorType

// @ts-ignore
// const htmlToDraft = dynamic(() => import('html-to-draftjs'), { ssr: false }) as unknown as typeof htmlToDraftType

// type Edit = {
//     id: ObjectId,
//     content: string,
//     draftContent: string,
//     categories: string[],
//     relatedPosts: ObjectId[],
//     title: string,
//     draft: number,
//     featured: number,
//     slug: string
// } & Pick<Post, "image">

interface OwnProps {
    // post: string
    slug?: string,
    setSlug?: (slug: string) => void,
    catlist?: string[],
    catlistLoading?: boolean,
    postlist?: {_id: string, title: string}[],
    postlistLoading?: boolean
}

type Props = OwnProps;

const FormEdit: FunctionComponent<Props> = (props) => {
    const defaultState: Edit = {
        content: "",
        draftContent: "",
        categories: [],
        relatedPosts: [],
        title: "",
        draft: true,
        featured: false,
        slug: props.slug,
        image: ''
    }

    // const { catlist, catlistLoading } = useCategoryList()

    const [ editorState, setEditorState ] = useState<EditorState>();
    const [ state, setState ] = useReducer((state: Edit, action: Partial<Edit> & { options?: { refreshEditor?: boolean } }) => {
        action = removeCond(action, obj => (obj !== undefined))
        const options = action.options
        delete action.options

        const newState = { ...defaultState, ...state, ...action }

        if(options?.refreshEditor) {
            setEditorState(editorStateFromHTML(newState.draftContent))
        }

        return newState
    }, defaultState)

    // ui
    const [ raw, setRaw ] = useReducer((lastState: boolean, newState: boolean) => {
        // when switching from raw to not raw, update the editor with changes
        if(!newState && lastState) setEditorState(editorStateFromHTML(state.draftContent))

        return newState;
    }, false);

    // draft js
    const editorHTML = useCallback(() => {
        const contentState = editorState?.getCurrentContent()
        if(!contentState) return ""

        return draftToHtml(convertToRaw(contentState))
    }, [editorState])

    useEffect(() => {
        setState({draftContent: editorHTML()})
    }, [editorState, editorHTML])

    // axios
    const [ postData, fetchPostData ] = useAxios<Edit, APIError>({ url: '/api/admin/post', method: 'get', params: { slug: props.slug } }, {manual: true})
    const [ updateData, update ] = useAxios<{success: string, data: { slug: string }}, Edit, APIError>({ url: '/api/admin/edit', method: 'put' }, {manual: true})
    
    useEffect(() => {
        if(!props.slug) return

        fetchPostData()
            .then(({data}) => {
                setState({...data, options: { refreshEditor: true }})
            })
    }, [props.slug])

    const [ message, setMessage ] = useState<string | undefined>()

    const submit = (publish: boolean = false) => {
        const data: Edit = state
        if(publish) data['content'] = state.draftContent
        // else delete data['content']

        update({ data: data })
            .then((res) => {
                const {slug: newSlug} = res.data.data

                console.log(newSlug)

                props.setSlug?.(newSlug)
                setState({slug: newSlug})

                setMessage(`Post ${publish ? 'published' : 'updated'} successfully.`)
            })
            .catch((err) => {
                console.log(err?.response?.data)
                setMessage(`Error: ${err?.response?.data?.message}`)
            })
    }

    // useEffect(() => {
    //     if(postData.data) {
    //         console.log("got here 1")

    //         setState({ ...postData.data, options: {refreshEditor: true} })
    //     }
    // }, [postData])

    const loading = () => postData.loading || updateData.loading
    const error = () => updateData.error
    const disabled = () => postData.error
    // const message = () => updateData.data

    const canPublish = () => !state.draft

    return (<form className="formEdit">
        <div className="mb-5">
            <Button text="Publish" primary className="mr-2" disabled={!canPublish()} loading={loading()}
                onClick={(e) => {
                    e.preventDefault()
                    submit(true)
                }}
            />
            <Button text="Save" className="mr-2" loading={loading()}
                onClick={(e) => {
                    e.preventDefault()
                    submit()
                }}
            />
            <Checkbox text={"Draft"} name="draft" id="draft" disabled={!!disabled() || loading()}
                      checked={state.draft}
                      setChecked={c => setState({draft: c})} />

            <Checkbox text={"Featured"} name="featured" id="featured" disabled={!!disabled() || loading()}
                      checked={state.featured}
                      setChecked={c => setState({featured: c})} className="ml-2" />

            <FormMessage message={message} />
        </div>

        <Input placeholder={"Title..."}
               label={"Title"}
               value={state.title}
               onChange={e => setState({title: e.target.value})}
               disabled={!!disabled()}
               loading={loading()}
               error={error()?.response?.data?.errors?.title}
               className="w-full"
        />

        <Input placeholder={"Image URL..."}
            label={"Image"}
            value={state.image}
            onChange={e => setState({image: e.target.value})}
            disabled={!!disabled()}
            loading={loading()}
            error={error()?.response?.data?.errors?.image}
            className="w-full"
        />

        {/* <span className="label">Image</span> */}
        {/* <ImageUpload endpoint={'/api/post/upload_main'} imageURL={state.image ?? ''} id={props.post}
            setImage={image => setState({image: image})}
        /> */}

        <span className="label">Categories</span>
        <CategorySelect
            loading={!!props.catlistLoading}
            catlist={props.catlist}
            onChange={(cats) => setState({categories: cats})}
            value={state.categories}
            disabled={loading() || !!disabled()}
        />

        <span className="label">Similar Tools</span>
        <PostSelect
            postlist={props.postlist}
            postlistLoading={props.postlistLoading}
            onChange={(rposts) => setState({relatedPosts: rposts})}
            value={state.relatedPosts}
            disabled={loading() || !!disabled()}
        />

        <span className="label">Content</span>
        {/* @ts-ignore */}
        <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}

            wrapperClassName={"wys-wrapper" + " " + (raw ? "hidden" : "")}
            editorClassName="wys-editor headers"
            toolbarClassName="wys-toolbar"

            placeholder="Content..."

            readOnly={!!(loading() || disabled())}

            // uploadCallback={ async (file: object) => {
            //     const fd = new FormData()
            //     fd.append('image', file as Blob)

            //     const axiosPost = axios.post(`/api/post/upload/${props.post}`, fd)
                                        
            //     axiosPost.then((res) => console.log(res)).catch((err) => console.log(err))
                
            //     return await axiosPost
            // }}

            toolbar={{
                options: ['inline', 'blockType', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'image', 'remove', 'history'],
                // uploadCallback: async (file: object) => {
                //     const fd = new FormData()
                //     fd.append('image', file as Blob)

                //     const axiosResponse = await axios.post(`/api/post/upload/${props.post}`, fd)
                    
                //     return axiosResponse
                
                // },
                uploadEnabled: true,
                inputAccept: 'image/jpg,.jpg'
            }}
        />

        <TextArea
            placeholder="Raw content..."
            value={state.draftContent}
            onChange={e => setState({draftContent: e.target.value})}
            disabled={!!disabled()}
            loading={loading()}
            hidden={!raw}
            error={error()?.response?.data?.errors?.draftContent}
            className="w-full"
            // className="form-no-margin"
        />

        <Checkbox text={"Raw"} name='raw' id='raw' disabled={!!disabled() || loading()}
          checked={raw}
          setChecked={c => setRaw(c)} />

        <br/>
        <Button text={"Remove Styling"} className="inline" onClick={() => {
            let html = editorHTML()

            let frag = document.createRange().createContextualFragment(html);

            frag.querySelectorAll('*').forEach(node => {
                const name = node.tagName.toLowerCase()

                if(name != 'img' && name != 'iframe') {
                    node.removeAttribute('style')
                }

                if(name == 'br') {
                    node.remove()
                }
            })

            var div = document.createElement('div');
            div.appendChild( frag.cloneNode(true) );
         
            setEditorState(editorStateFromHTML( div.innerHTML ))
        }} />
    </form>);
};

const contentStateFromHTML = (html: string) => {
    const contentBlock = htmlToDraft(html)
    if(!contentBlock) return ContentState.createFromText("")

    return ContentState.createFromBlockArray(contentBlock.contentBlocks)
}

const editorStateFromHTML = (html: string) => {
    return EditorState.createWithContent(contentStateFromHTML(html))
}

export default FormEdit;
