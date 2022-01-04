import { AuthContext } from "api/user";
import { useCategoryList } from "client/categories";
import CategoryAdd from "components/forms/categories/CategoryAdd";
import CategoryRemove from "components/forms/categories/CategoryRemove";
import CategoryRename from "components/forms/categories/CategoryRename";
import FormCategoryManage from "components/forms/FormCategoryManage";
import NavHeading from "components/nav/NavHeading";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";

const ManagePage: NextPage = () => {
    const { catlist, refetchCatlist, catlistLoading } = useCategoryList()

    const { loggedIn } = useContext(AuthContext)
    const router = useRouter()

    if(loggedIn === false) router.push("/")

    return <>
        <NavHeading />

        <div className="main-page-size">
            <FormCategoryManage
                refetchCatlist={refetchCatlist}
                catlist={catlist?.catlist} 
                catlistLoading={catlistLoading} 
            />
        </div>
    </>
}

export default ManagePage