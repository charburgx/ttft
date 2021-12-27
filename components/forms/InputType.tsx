import React, { FunctionComponent } from 'react';

interface OwnProps {
    error?: Nullable<string>,
    label?: Nullable<string>,
    hidden?: boolean,
    wrapperClassName?: string
}

export type InputTypeProps = OwnProps;

const InputType: FunctionComponent<InputTypeProps> = (props) => {
    return (<div className={'form-input ' + (props.hidden ? 'hidden' : '') + ' ' + (props.wrapperClassName ?? '')}>
        <label>
            {props.label ?
                <span className="label">{props.label} <br/></span>
                : ''}

            {props.children}

            {props.error ?
                <span className="text-form-err-500 text-sm relative font-medium">{props.error}</span>
                : ''}
        </label></div>
    );
};

export default InputType;
