import {useEffect, useState} from "react";
import axios from "axios";
import React from "react";

// export type UserAxiosRes = UseAxiosResult<APIRes<User>, APIError>;

// type LoginResponse = any

export type AuthController = ReturnType<typeof createAuthContext>

export const AuthContext = React.createContext<AuthController>(null as unknown as AuthController);

function createAuthContext() {
    const [ loggedIn, setLoggedIn ] = useState<boolean|null>(null)

    const checkLoggedIn = () => {
        axios.get("/api/admin/auth")
            .then(res => {
                setLoggedIn(true)
            })
            .catch(err => {
                setLoggedIn(false)
            })
    }

    useEffect(() => {
        checkLoggedIn()
    }, [])

    const logIn = (password: string) => {
        return axios.post<{success: boolean}>("/api/admin/login", {
            password: password
        })
        .then((value) => {
            if(value.data.success) setLoggedIn(true)

            return value.data.success
        })
    }

    const logOut = () => {
        return axios.post("/api/admin/logout")
            .then((value) => {
                setLoggedIn(false)
            })
    }

    return { loggedIn, checkLoggedIn, logIn, logOut }
}

export { createAuthContext }
