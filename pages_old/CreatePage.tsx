import React, {FunctionComponent, useEffect, useState} from 'react';
import useAxios from "axios-hooks";
import axios from 'axios';
import RedirectIfLoggedOut from '../components/RedirectIfLoggedOut';
import { useRouter } from 'next/router';

interface OwnProps {}

type Props = OwnProps;

const CreatePage: FunctionComponent<Props> = (props) => {
    const router = useRouter()

    const [ cancelToken ] = useState(axios.CancelToken.source())

    const [ { data }, createNew ] = useAxios<{ id: number }, APIError>({ url: "/api/post/new", method: "post", cancelToken: cancelToken.token }, { manual: true });

    useEffect(() => {
        createNew().then((res) => { router.push(`/edit/${res.data.id}`) })
        return () => { cancelToken.cancel() }
    }, [])

    return (<>
        <RedirectIfLoggedOut />
    </>);
};

export default CreatePage;
