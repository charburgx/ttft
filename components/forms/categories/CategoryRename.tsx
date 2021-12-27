import useAxios from 'axios-hooks'
import React, { FunctionComponent, useContext, useState } from 'react'
import { CategoryListContext } from '../../App'
import CategorySelectSingle from '../../CategorySelectSingle'
import Button from '../Button'
import FormMessage from '../FormMessage'
import Input from '../Input'

type Props = { }

const CategoryRename: FunctionComponent<Props> = (props) => {
    const [ {}, refetchCategories ] = useContext(CategoryListContext)
    
    const [category, setCategory] = useState<string|undefined>()
    const [categoryName, setCategoryName] = useState<string>("")
    const [message, setMessage] = useState<string|undefined>()
    const [ {data, loading, error}, submitHTTP ] = useAxios<{success: string}, APIError>({url: '/api/categories/rename', method: 'put'}, {manual: true})

    const submit = () => {
        submitHTTP({params: { name: category, new_name: categoryName }})
            .then((res) => {
                setMessage(res.data.success)
                refetchCategories()
                
                setCategory(undefined)
                setCategoryName("")
            })
            .catch((err) => {
                setMessage(err?.response?.data?.message)
            })
    }

    const canSubmit = () => {
        return !loading && !!categoryName && !!category
    }

    return (<>
            <div className="selector">
                <CategorySelectSingle 
                    onChange={cat => {
                        setCategory(cat)
                        setCategoryName(cat)
                    }}
                    value={category}
                />
            </div>

            <Input placeholder="Name..." loading={loading} error={error?.response?.data?.errors?.name} 
                value={categoryName}
                onChange={e => setCategoryName(e.target.value)}
            />

            <Button text="Rename" loading={loading} disabled={!canSubmit()} onClick={() => submit()} />

            <FormMessage message={message} />
        </>)
}

export default CategoryRename