import useAxios from "axios-hooks";

export function useCategoryList() {
    const [ {data, loading, error }, refetch ] = useAxios<{catlist: string[]}>('/api/admin/categories')

    return { catlist: data, catlistLoading: loading, catlistErr: error, refetchCatlist: refetch }
}