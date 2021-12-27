import React, {FunctionComponent, useContext} from 'react';
import FormLogin from "../components/login/FormLogin";
import {AuthContext} from "../components/App";
import { useRouter } from 'next/router';

interface OwnProps {}

type Props = OwnProps

const LoginPage: FunctionComponent<Props> = (props) => {
    const auth = useContext(AuthContext);
    const router = useRouter()

    if(auth.loggedIn()) router.push("/")

    return (<>
      <div className="mx-auto px-4 max-w-[500px] lg:mt-[200px] md:mt-[100px] sm:mt-[50px] mt-4">
          <div className="p-4 border-[1px] border-form-out1 shadow-md">
              <FormLogin />
          </div>
      </div>
    </>);
};

export default LoginPage
