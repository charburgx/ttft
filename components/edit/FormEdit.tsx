import React, {FunctionComponent, useCallback, useContext, useEffect, useReducer, useState} from 'react';
import useAxios from "axios-hooks";
import Input from "../forms/Input";
import {ContentState, convertToRaw, EditorState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import {AuthContext, CategoryListContext} from "../App";
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
    post: string
}

type Props = OwnProps;

const FormEdit: FunctionComponent<Props> = (props) => {
    const defaultState: Edit = {
        content: "",
        draftContent: "",
        categories: [],
        relatedPosts: [],
        title: "",
        draft: false,
        featured: false,
        slug: props.post,
        image: null
    }

    const [ editorState, setEditorState ] = useState<EditorState>();
    const [ state, setState ] = useReducer((state: Edit, action: Partial<Edit> & { options?: { refreshEditor?: boolean } }) => {
        action = removeCond(action, obj => (!!obj || obj === 0))
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
    const [ postData ] = useAxios<Edit, APIError>({ url: '/api/post/retrieve', method: 'get', params: { id: props.post } })
    const [ updateData, update ] = useAxios<{message: string}, Edit, APIError>({ url: '/api/post/edit', method: 'put' }, {manual: true})
    const [ message, setMessage ] = useState<string | undefined>()

    const submit = (publish: boolean = false) => {
        const data: Edit = state
        if(publish) data['content'] = state.draftContent
        // else delete data['content']

        update({ data: data })
            .then((res) => {
                // console.log(res)
                setMessage(`Post ${publish ? 'published' : 'updated'} successfully.`)
            })
            .catch((err) => {
                console.log(err?.response?.data)
                setMessage(`Error: ${err?.response?.data?.message}`)
            })
    }

    useEffect(() => {
        if(postData.data) {
            setState({ ...postData.data, options: {refreshEditor: true} })
        }
    }, [postData])

    const loading = () => postData.loading || updateData.loading
    const error = () => postData.error
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
                      checked={state.draft === true}
                      setChecked={c => setState({draft: c})} />

            <Checkbox text={"Featured"} name="featured" id="featured" disabled={!!disabled() || loading()}
                      checked={state.featured === true}
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

        <span className="label">Image</span>
        <ImageUpload endpoint={'/api/post/upload_main'} imageURL={state.image ?? ''} id={props.post}
            setImage={image => setState({image: image})}
        />

        <span className="label">Categories</span>
        <CategorySelect
            onChange={(cats) => setState({categories: cats})}
            value={state.categories}
            disabled={loading() || !!disabled()}
        />

        <span className="label">Similar Tools</span>
        <PostSelect
            onChange={(rposts) => setState({relatedPosts: rposts})}
            value={state.relatedPosts}
            disabled={loading() || !!disabled()}
        />

        <span className="label">Content</span>
        <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}

            wrapperClassName={"wys-wrapper" + " " + (raw ? "hidden" : "")}
            editorClassName="wys-editor headers"
            toolbarClassName="wys-toolbar"

            placeholder="Content..."

            readOnly={!!(loading() || disabled())}

            uploadCallback={ async (file: object) => {
                const fd = new FormData()
                fd.append('image', file as Blob)

                const axiosPost = axios.post(`/api/post/upload/${props.post}`, fd)
                                        
                axiosPost.then((res) => console.log(res)).catch((err) => console.log(err))
                
                return await axiosPost
            }}

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
