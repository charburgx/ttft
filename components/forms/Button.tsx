import React, { FunctionComponent } from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    text: string,
    primary?: boolean,
    loading?: boolean
};

const Button: FunctionComponent<Props> = (p) => {

  const { loading, ...props } = p

  return (<button {...props} className={`
    p-2.5
    leading-none
    ${props.primary ? 'btn-primary' : 'btn-secondary'}
    transition-colors
    rounded-sm
    ${loading ? 'cursor-wait' : ''}
  ` + " " +  (props.className ?? '') } disabled={props.disabled || loading}
  
    onClick={(props.type != 'submit') ? e => { e.preventDefault(); props.onClick?.(e) } : props.onClick}
  >
      {props.text}
  </button>);
};

export default Button;
