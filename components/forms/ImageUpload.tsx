import React, {FunctionComponent, useEffect, useState} from 'react';
import useAxios from "axios-hooks";
import Button from "./Button";
import FormMessage from "./FormMessage";

interface OwnProps {
    id: string,
    endpoint: string,
    imageURL?: string,
    disabled?: boolean,
    setImage?: (image: string) => void
}

type Props = OwnProps;

const ImageUpload: FunctionComponent<Props> = (props) => {
    const [ { data, error, loading }, uploadHTTP ] = useAxios<{success: string, image: string}, any, APIError>({
            url: props.endpoint,
            method: 'post',
            headers: { 'Content-Type': 'multipart/form-data' }
        },
        {manual: true}
    )

    const [ image, setImage ] = useState<File|null>()
    const [ message, setMessage ] = useState<string|undefined>()

    const upload = () => {
        if(!image) return

        const fd = new FormData()
        fd.append('image', image)
        fd.append('id', props.id.toString())

        uploadHTTP({data: fd})
            .then((res) => {
                props.setImage?.(res.data.image)
            })
    }

    useEffect(() => { setMessage(data?.success) }, [data])
    useEffect(() => { setMessage(error?.response?.data?.message)
        console.log(error?.response?.data?.fields)
    }, [error])

    return (<>
        <div className="form-input">
            {/*<div className="border-form-out2 border-[1px] h-[200px] max-w-[300px] bg-center bg-contain bg-no-repeat" style={{backgroundImage: `url("${props.imageURL}")`}} />*/}
            {props.imageURL ? <img alt="Uploaded image" src={props.imageURL} className="max-h-[200px]" /> : ''}
            <input type='file' onChange={e => setImage(e.target.files?.[0])} className="mt-2" accept="image/jpg,.jpg" />
            <Button text="Upload" loading={loading} disabled={props.disabled || !image} onClick={() => upload()} className="block mt-2" />
            <FormMessage message={message} />
        </div>
    </>);
};

export default ImageUpload;
