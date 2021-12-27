type Paginated<T> = {
    data: {
        hits: T[]
    },
    next_page_url: string | undefined,
    current_page: number,
    last_page: number
}
