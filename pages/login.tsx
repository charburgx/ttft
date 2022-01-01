import { AuthContext } from "api/user";
import FormLogin from "components/login/FormLogin";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";

const LoginPage: NextPage = () => {
    const auth = useContext(AuthContext);
    const router = useRouter()

    console.log(auth.loggedIn)

    if(auth.loggedIn) router.push("/")

    return (<>
      <div className="mx-auto px-4 max-w-[500px] lg:mt-[200px] md:mt-[100px] sm:mt-[50px] mt-4">
          <div className="p-4 border-[1px] border-form-out1 shadow-md">
              <FormLogin />
          </div>
      </div>
    </>);
}

export default LoginPage