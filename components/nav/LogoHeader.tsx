import React, { FunctionComponent } from 'react';
import Link from 'next/link';

interface OwnProps {}

type Props = OwnProps;

const LogoHeader: FunctionComponent<Props> = (props) => {

  return (<>
      <Link href="/"><a>
          <div className="absolute top-0">
              <img src="/apple_logo.png" alt="Logo" className="w-[50px] m-5 mr-4" />
              <span className="font-sans-title text-3xl text-main-300 font-light w-[300px] absolute top-[34px] left-[87px]">Tech Tools for Teachers</span>
          </div>
       </a></Link>
  </>);
};

export default LogoHeader;
