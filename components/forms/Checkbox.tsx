import React, { FunctionComponent } from 'react';

interface OwnProps {
    text: string,
    name?: string,
    id?: string,
    checked: boolean,
    setChecked: (checked: boolean) => void
    disabled?: boolean,
    className?: string
}

type Props = OwnProps;

const Checkbox: FunctionComponent<Props> = (props) => {
  return (
      <>
          <input type='checkbox' checked={props.checked} onChange={e => props.setChecked?.(e.target.checked)} name={props.name} id={props.name}
                 className={`appearance-none w-4 h-4 top-0.5 relative border-[1px] rounded-sm border-form-out2 checked:border-none checked:bg-acc-2 
                 ${props.className ?? ''}`} 
                 />
          <label htmlFor={props.id} className="select-none ml-1">{props.text}</label>
      </>
  );
};

export default Checkbox;
