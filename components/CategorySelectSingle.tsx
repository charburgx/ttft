import React, {FunctionComponent, useContext} from 'react';
import Select from "react-select";

interface OwnProps {
    onChange(result: string): void,
    disabled?: boolean
    value?: string
    catlist?: string[]
    loading?: boolean
}

type Props = OwnProps;

const CategorySelectSingle: FunctionComponent<Props> = ({catlist, loading, ...props}) => {
    // const [ { data: catlist, loading } ] = useContext(CategoryListContext)

    return (<Select
      className="multiselect"
      classNamePrefix="multiselect"
      options={catlist?.map(cat => ({ value: cat, label: cat })) ?? []}
      isDisabled={props.disabled || loading}
      defaultValue={null}
      // closeMenuOnSelect={false}
      isMulti={false}

      placeholder="Category..."
      noOptionsMessage={() => null}
        // @ts-ignore
      onChange={(res) => props.onChange(res.value)}

      // isClearable={true}
      value={{ value: props.value, label: props.value }}
  />);
};

export default CategorySelectSingle;
