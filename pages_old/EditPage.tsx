import React, { FunctionComponent } from 'react';
import FormEdit from "../components/edit/FormEdit";
import NavHeading from "../components/nav/NavHeading";
import RedirectIfLoggedOut from '../components/RedirectIfLoggedOut';

interface OwnProps {}

type Props = OwnProps;

const EditPage: FunctionComponent<Props> = (props) => {
    const {id} = useParams<{id: string}>();

    if(isNaN(Number(id))) return <Redirect to={'/'} />

    return (
        <>
            <RedirectIfLoggedOut />

            <NavHeading className="mb-5" />

            <div className="max-w-[1000px]">
                <div className="p-4">
                    <FormEdit post={+id} />
                </div>
            </div>
        </>
    );
};

export default EditPage;
