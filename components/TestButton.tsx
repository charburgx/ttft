import React, {FunctionComponent, useContext} from 'react';
import {PCContext} from "./App";

interface OwnProps {}

type Props = OwnProps;

const TestButton: FunctionComponent<Props> = (props) => {
  const pc = useContext(PCContext)

  return (
    <button onClick={() => pc.fetch()}>
        Fetch
    </button>
  );
};

export default TestButton;
