import React, { FunctionComponent } from 'react';
import InputType, {InputTypeProps} from './InputType';

// interface OwnProps = React.InputHTMLAttributes<HTMLInputElement>;

type InputType = "input" | "textarea"

type Props = React.InputHTMLAttributes<HTMLInputElement> & InputTypeProps & {
    loading?: boolean
};

const Input: FunctionComponent<Props> = (props) => {
  return (<InputType {...props}>
      <input {...props} className={`
                  form-text-input
                  ${props.error ? 'form-error' : ''}
                  ${props.loading ? 'cursor-wait' : ''}
              ` + " " + (props.className ?? "")} disabled={props.disabled || props.loading} />
  </InputType>);
};

export default Input;
