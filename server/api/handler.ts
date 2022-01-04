import type { NextApiRequest, NextApiResponse } from "next"
import nc from "next-connect"
import { AuthenticationError, throwAPIError } from "./errors"
import { ValidationError } from "express-validation"
import cookieSession from "cookie-session"
import {CookieSessionInterfaces} from "./cookies"

// export const execArgs = (req: NextApiRequest, res: NextApiResponse) => ({ body: req.body, params: req.query, req: req, res: res } as any)

const {COOKIE_SECRET} = process.env
if(!COOKIE_SECRET) throw new Error('COOKIE_SECRET IS NOT SET IN ENV !!')

export type HandlerRequest = NextApiRequest & CookieSessionInterfaces.CookieSessionRequest

const handler = () => nc<HandlerRequest, NextApiResponse>({
    onError: (err, req, res, next) => {
        if(err instanceof AuthenticationError) {
            throwAPIError(res, 403, {message: err.message})
            return
        }

        if(err instanceof ValidationError) {
            const details = err.details as {[index: string]: string}[]

            const errors = details.reduce((prev, curr) => ({ ...prev, ...curr }), {})

            throwAPIError(res, 400, { message: "Validation error", errors: errors as any })
            return
        }

        if(err.status && err.message) {
            throwAPIError(res, err.status as number, { message: err.message })
            return
        }

        console.log(err)

        throwAPIError(res, 500, {message: "Internal server error"})
    }
})
.use(cookieSession({
    name: 'session',
    secret: COOKIE_SECRET,
    maxAge: 24 * 60 * 60 * 1000
}))
// .use((req, res, next) => {
//     console.log(req.body)

//     try {
//         req.body = JSON.parse(req.body)
//     } catch {
//         //TODO: Throw error
//         req.body = { }
//     }

//     return next()
// })

export type HandlerMiddleware = Parameters< ReturnType<typeof handler>['use']>[1]

export default handler