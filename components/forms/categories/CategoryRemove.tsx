import useAxios from 'axios-hooks'
import React, { FunctionComponent, useContext, useState } from 'react'
import { CategoryListContext } from '../../App'
import CategorySelectSingle from '../../CategorySelectSingle'
import Button from '../Button'
import FormMessage from '../FormMessage'

type Props = { }

const CategoryRemove: FunctionComponent<Props> = (props) => {
    const [ {}, refetchCategories ] = useContext(CategoryListContext)
    
    const [category, setCategory] = useState<string|undefined>()
    const [message, setMessage] = useState<string|undefined>()
    const [ {data, loading, error}, submitHTTP ] = useAxios<{success: string}, APIError>({url: '/api/categories/delete', method: 'delete'}, {manual: true})

    const submit = () => {
        submitHTTP({params: { name: category }})
            .then((res) => {
                setMessage(res.data.success)
                refetchCategories()

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
                    onChange={setCategory}
                    value={category}
                />
            </div>

            <Button text="Delete" loading={loading} disabled={!canSubmit()} onClick={() => submit()} />

            <FormMessage message={message} />
        </>)
}

export default CategoryRemove