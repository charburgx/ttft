import React, { FunctionComponent } from 'react'
import CategoryAdd from './categories/CategoryAdd'
import CategoryRemove from './categories/CategoryRemove'
import CategoryRename from './categories/CategoryRename'

type Props = { 
    catlist?: string[],
    catlistLoading: boolean,
    refetchCatlist: () => void
}

const FormCategoryManage: FunctionComponent<Props> = ({catlist, catlistLoading, refetchCatlist}) => {
    return (<>
        <form className="formCategoryManage border-[1px] border-form-out2 p-4">
            <div>
                <span className="label">Add Category</span>
                <CategoryAdd refetchCatlist={refetchCatlist} />
            </div>

            <div>
                <span className="label">Rename Category</span>
                <CategoryRename 
                    refetchCatlist={refetchCatlist}
                    catlist={catlist} 
                    catlistLoading={catlistLoading} 
                />
            </div>

            <div>
                <span className="label">Remove Category</span>
                <CategoryRemove 
                    refetchCatlist={refetchCatlist} 
                    catlist={catlist} 
                    catlistLoading={catlistLoading} 
                />
            </div>
        </form>
    </>)
}

export default FormCategoryManage