import useAxios from 'axios-hooks'
import React, { FunctionComponent, useContext, useState } from 'react'
import CategorySelectSingle from '../../CategorySelectSingle'
import Button from '../Button'
import FormMessage from '../FormMessage'

type Props = { 
    catlist?: string[],
    catlistLoading: boolean,
    refetchCatlist: () => void
}

const CategoryRemove: FunctionComponent<Props> = ({refetchCatlist, catlist, catlistLoading}) => {
    // const [ {}, refetchCategories ] = useContext(CategoryListContext)
    
    const [category, setCategory] = useState<string|undefined>()
    const [message, setMessage] = useState<string|undefined>()
    const [ {data, loading, error}, submitHTTP ] = useAxios<{success: string}, APIError>({url: '/api/admin/category/delete', method: 'delete'}, {manual: true})

    const submit = () => {
        submitHTTP({params: { name: category }})
            .then((res) => {
                setMessage(res.data.success)
                refetchCatlist()

                setCategory(undefined)
            })
            .catch((err) => {
                setMessage(err?.response?.data?.message)
            })
    }

    const canSubmit = () => {
        return !loading && !!category
    }

    return (<>
            <div className="selector">
                <CategorySelectSingle 
                    catlist={catlist}
                    loading={catlistLoading}

                    onChange={setCategory}
                    value={category}
                />
            </div>

            <Button text="Delete" loading={loading} disabled={!canSubmit()} onClick={() => submit()} />

            <FormMessage message={message} />
        </>)
}

export default CategoryRemove