import { NextApiResponse } from "next";

type APIErrorFields = [
    {
        [index: string]: string
    }
];


export interface APIErrorJson {
    message: string
    fields?: APIErrorFields
}

export class AuthenticationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AuthenticationError";
    }
}

export class NotFoundError extends Error {
    status: number

    constructor(message: string) {
        super(message)
        this.name = "NotFoundError"
        this.status = 404
    }
}

export function throwAPIError<T>(res: NextApiResponse<T>, status: number, err: APIErrorJson) {
    res.status(status).end(JSON.stringify(err))
}