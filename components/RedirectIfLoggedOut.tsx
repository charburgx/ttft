import { useRouter } from 'next/router'
import React, { FunctionComponent, useContext } from 'react'
import { AuthContext } from './App'

type Props = { }

const RedirectIfLoggedOut: FunctionComponent<Props> = (props) => {
    const auth = useContext(AuthContext)
    
    const router = useRouter()

    if(!auth.loggedIn()) router.push('/')

    return (<></>)
}

export default RedirectIfLoggedOut