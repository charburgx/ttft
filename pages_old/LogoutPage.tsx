import React, { FunctionComponent, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { AuthContext } from '../components/App'
import { useRouter } from 'next/router'

type Props = { }

const LogoutPage: FunctionComponent<Props> = (props) => {
    const auth = useContext(AuthContext)
    let router = useRouter()

    const logout = () => {
        auth.logout()
            .then((res) => {
                auth.refetchUser()
                router.push('/')
            })
            .catch(() => {
                auth.refetchUser()
                router.push('/')
            })
    }
    
    useEffect(() => { logout() }, [])

    return (
        <></>
    )
}

export default LogoutPage
