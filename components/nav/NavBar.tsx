import React, {FunctionComponent, useContext} from 'react';
import {AuthContext} from "../../api/user";
import Link from 'next/link'
import { useRouter } from 'next/router';


interface OwnProps {}

type Props = OwnProps;

type AnchorProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

const entryClass = "mr-5 font-sans text-xl text-main-300 font-normal inline-block "

const NavBar: FunctionComponent<Props> = (props) => {
    const auth = useContext(AuthContext)
    const router = useRouter()

    const logout = () => {
        auth.logOut()
            .then(() => {
                router.push("/")
            })
    }

  return (
      <ul className="absolute right-0 top-0 md:mt-4 mt-[5.25rem]">
          {(auth.loggedIn) ?
              <>
                <li className="inline">
                    <Entry href="/edit" >
                        <a className={entryClass}>
                            Create
                        </a>
                    </Entry>
                </li>   
                <li className="inline">
                    <a className={entryClass + "hover:cursor-pointer"} onClick={() => logout()}>
                        Logout
                    </a>
                </li>
                <li className="inline">
                    <Entry href="/manage" >
                        <a className={entryClass}>
                            Manage
                        </a>
                    </Entry>
                </li>
              </>

              // <Menu as='li' className="inline">
              //     <Menu.Button as={Entry} className="hover:cursor-pointer">
              //         Account
              //     </Menu.Button>
              //     <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
              //         <div className="p-1">
              //
              //         </div>
              //     </Menu.Items>
              // </Menu>
          : ''}

          {!auth.loggedIn ? ["Browse the Tools", "About", "Contact"].map(name => <li key={name} className="inline">
              <Entry href="">
                  <a className={entryClass}>{name}</a>
              </Entry>
          </li>) : ''}
      </ul>);
};

const Entry: FunctionComponent<any> = (props) => {
   const CompAs = Link

    return (
        <CompAs {...props} to={props.href}>
            {props.children}
        </CompAs>
)}

export default NavBar;
