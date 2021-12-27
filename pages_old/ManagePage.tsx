import React, { FunctionComponent, useContext } from 'react'
import { AuthContext } from '../components/App'
import FormCategoryManage from '../components/forms/FormCategoryManage'
import NavHeading from '../components/nav/NavHeading'
import RedirectIfLoggedOut from '../components/RedirectIfLoggedOut'

type Props = { }

const ManagePage: FunctionComponent<Props> = (props) => {
    const auth = useContext(AuthContext)
    
    return (
    <>
        <NavHeading />

        <RedirectIfLoggedOut />

        <div className="main-page-size">
            <FormCategoryManage />
        </div>
    </>)
}

export default ManagePage