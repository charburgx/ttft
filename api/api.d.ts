type APIRes<T> = T;

type APIError = {
    // response: {
        message: string,
        errors?: {
            [field: string]: string
        },
        // status: number,
        // statusText: string
    // }
}
