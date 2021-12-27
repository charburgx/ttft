import useAxios, {ResponseValues, UseAxiosResult} from "axios-hooks";
import {useEffect, useState} from "react";
import {AxiosPromise} from "axios";
import React from "react";

export type UserAxiosRes = UseAxiosResult<APIRes<User>, APIError>;

type LoginResponse = any

export const AuthContext = React.createContext<AuthController>(null as unknown as AuthController);

export type AuthController = {
    // axiosUser: UserAxiosRes,
    loggedIn: () => boolean|null,
    // login: (email: string, password: string) => AxiosPromise,
    // loginResponse: ResponseValues<LoginResponse, any, APIError>,
    logout: () => Promise<any>,
//     refetchUser: () => Promise<void>,
//     setLoggedIn: (loggedIn: boolean|null) => void
}

function createAuthContext(): AuthController {
    // const UserContext = React.createContext<UseAxiosResult<APIRes<User>, APIError>>(user);

    // let res;
    //
    // try {
    //     res = useAxios<APIRes<User>, APIError>('/api/user')
    // }catch (e) {
    //     console.log('exception reached :c')
    // }
    //
    // // @ts-ignore
    // return res;

    // const axiosUser = useAxios<APIRes<User>, APIError>({url: '/api/user', method: "get"}, { manual: true })

    // const [ loginResponse , postLogin ] = useAxios<LoginResponse, APIError>({url: '/auth/login', method: "post"}, {manual: true})

    // const [ loggedIn, setLoggedIn ] = useState<boolean|null>(null)

    // const [ _, postLogout ] = useAxios<any, APIError>({url: '/auth/logout', method: "post"}, { manual: true })

    // const refetchUser = () => axiosUser[1]().then((res) => setLoggedIn(true)).catch((err) => setLoggedIn(false))

    // const login = (email: string, password: string) => postLogin({params: { email: email, password: password }}).finally(() => refetchUser())

    // useEffect(() => { console.log(loginResponse.data) }, [ loginResponse.data ])

    return {
        // axiosUser: axiosUser,
        loggedIn: () => false,
        // setLoggedIn: setLoggedIn,
        // refetchUser: refetchUser,
        // login: login,
        // loginResponse: loginResponse,
        logout: async () => { },
    }
}

export { createAuthContext }
