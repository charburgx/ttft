import { AuthContext } from "api/user";
import useAxios from "axios-hooks";
import { useCategoryList } from "client/categories";
import FormEdit from "components/edit/FormEdit";
import NavHeading from "components/nav/NavHeading";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { database } from "server/db";

// export const getStaticProps: GetStaticProps = async (context) => {
//     const db = await database()

//     const catlist = (await db.collection('categories').find().toArray()).map(cat => cat.name)
    
//     return {
//         props: {
//             catlist
//         }
//     }
// }

const EditPage: NextPage = () => {
    const router = useRouter()

    const auth = useContext(AuthContext)

    if(auth.loggedIn === false) router.push("/")

    // const [ slug, setSlugRaw ] = useState(router.query.slug as string|undefined)

    const setSlug = (val: string) => {
        router.query.slug = val
        router.push(router, undefined, { shallow: true })
    }

    useEffect(() => {
        console.log(router.query)
    }, [router.query])

    const { catlist, catlistLoading } = useCategoryList()
    const [ { data: postlistData, loading: postlistLoading } ] = useAxios<{data: {_id: string, title: string}[]}>('/api/admin/postlist')

    return (<>
        <NavHeading className="mb-5" />

        <div className="max-w-[1000px]">
            <div className="p-4">
                <FormEdit
                    catlist={catlist?.catlist}
                    catlistLoading={catlistLoading}

                    postlist={postlistData?.data}
                    postlistLoading={postlistLoading}

                    slug={router.query.slug as string|undefined}
                    setSlug={setSlug}
                />
            </div>
        </div>
    </>)
}

export default EditPage