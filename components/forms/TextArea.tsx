import React, { FunctionComponent } from 'react';
import InputType, {InputTypeProps} from "./InputType";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & InputTypeProps & {
    loading?: boolean
};

const TextArea: FunctionComponent<Props> = (props) => {

  return (<InputType {...props}>
      <textarea {...props} className={`
                  form-text-input
                  h-[300px]
                  ${props.error ? 'form-error' : ''}
                  ${props.loading ? 'cursor-wait' : ''}
              ` + " " + (props.className ?? "")} disabled={props.disabled || props.loading} />
        </InputType>);
};

export default TextArea;
