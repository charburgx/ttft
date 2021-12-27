import React, { FunctionComponent } from 'react';

interface OwnProps {
    className?: string
}

type Props = OwnProps;

const Loader: FunctionComponent<Props> = ({className}) => {
  return (<div className={className}>
      <div className={"lds-ellipsis"}>
      <div/>
      <div/>
      <div/>
      <div/>
      </div></div>);
};

export default Loader;
