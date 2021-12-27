import React, { FunctionComponent } from 'react'
import CategoryAdd from './categories/CategoryAdd'
import CategoryRemove from './categories/CategoryRemove'
import CategoryRename from './categories/CategoryRename'

type Props = { }

const FormCategoryManage: FunctionComponent<Props> = (props) => {
    return (<>
        <form className="formCategoryManage border-[1px] border-form-out2 p-4">
            <div>
                <span className="label">Add Category</span>
                <CategoryAdd />
            </div>

            <div>
                <span className="label">Rename Category</span>
                <CategoryRename />
            </div>

            <div>
                <span className="label">Remove Category</span>
                <CategoryRemove />
            </div>
        </form>
    </>)
}

export default FormCategoryManage