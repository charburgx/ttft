import useAxios from 'axios-hooks'
import { useCategoryList } from 'client/categories'
import React, { FunctionComponent, useContext, useState } from 'react'
import CategorySelectSingle from '../../CategorySelectSingle'
import Button from '../Button'
import FormMessage from '../FormMessage'
import Input from '../Input'

type Props = { 
    refetchCatlist: () => void
}

const CategoryAdd: FunctionComponent<Props> = ({refetchCatlist}) => {
    // const { catlist, refetchCatlist } = useCategoryList()
    
    const [categoryName, setCategoryName] = useState<string>("")
    const [message, setMessage] = useState<string|undefined>()
    const [ {data, loading, error}, submitHTTP ] = useAxios<{success: string}, {name: string}, APIError>({url: '/api/admin/category/new', method: 'post'}, {manual: true})

    const submit = () => {
        submitHTTP({data: { name: categoryName }})
            .then((res) => {
                setMessage(res.data.success)
                refetchCatlist()

                setCategoryName("")
            })
            .catch((err) => {
                setMessage(err?.response?.data?.message)
            })
    }

    const canSubmit = () => {
        return !loading && !!categoryName
    }

    return (<>
            <Input placeholder="Name..." loading={loading} error={error?.response?.data?.errors?.name} 
                value={categoryName}
                onChange={e => setCategoryName(e.target.value)}
            />

            <Button text="Create" loading={loading} disabled={!canSubmit()} onClick={() => submit()} />

            <FormMessage message={message} />
        </>)
}

export default CategoryAdd