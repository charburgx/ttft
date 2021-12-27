import React, { FunctionComponent } from 'react';

interface OwnProps {
    message?: string
}

type Props = OwnProps;

const FormMessage: FunctionComponent<Props> = ({message}) => {
    return (<>
        {message ? <p className="text-form-out2 text-md mt-2 italic select-none">{message}</p> : ""}
    </>);
};

export default FormMessage;
