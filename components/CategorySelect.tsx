import React, {FunctionComponent, useContext} from 'react';
import Select from "react-select";
import { Category } from '../models/category';

interface OwnProps {
    onChange(results: string[]): void,
    disabled?: boolean
    value?: string[]
    catlist?: string[]
    loading: boolean
}

type Props = OwnProps;

const CategorySelect: FunctionComponent<Props> = (props) => {
    // const [ { data: catlist, loading } ] = useContext(CategoryListContext) as [{data?: Category[], loading: boolean }] 

    return (<Select
      className="multiselect"
      classNamePrefix="multiselect"
      options={props.catlist?.map(cat => ({ value: cat, label: cat })) ?? []}
      isDisabled={props.disabled || props.loading}
      defaultValue={null}
      closeMenuOnSelect={false}
      isMulti={true}

      placeholder="Categories..."
      noOptionsMessage={() => null}
        // @ts-ignore
      onChange={(res) => props.onChange(res.map(obj => obj.value))}

      isClearable={true}
      value={props.value?.map(val => ({value: val, label: val}))}
  />);
};

export default CategorySelect;
