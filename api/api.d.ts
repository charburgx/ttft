type APIRes<T> = T;

type APIError = {
    // response: {
        message: string,
        fields?: {
            [field: string]: string
        },
        // status: number,
        // statusText: string
    // }
}
