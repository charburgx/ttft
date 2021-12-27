import React, { FunctionComponent } from 'react';
import NavBar from "./NavBar";
import LogoHeader from "./LogoHeader";

interface OwnProps {
    className?: string
}

type Props = OwnProps;

const NavHeading: FunctionComponent<Props> = (props) => {
  return (<div className={"h-[7.5rem] md:h-24" + (props.className ?? "")}>
    <LogoHeader />
    <NavBar />
  </div>);
};

export default NavHeading;
