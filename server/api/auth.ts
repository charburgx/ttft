import { HandlerMiddleware, HandlerRequest } from "./handler";
import addMinutes from "date-fns/addMinutes"
import { AuthenticationError } from "./errors";

export const requireLoggedIn: HandlerMiddleware = (req, res, next) => {
    if(!isLoggedIn(req)) {
        throw new AuthenticationError("You must be logged in to do this")
    }

    return next()
}

export const authMiddleware: HandlerMiddleware = (req, res, next) => {
    if(req.session && isLoggedIn(req)) {
        if(new Date() > req.session.expires) {
            req.session = null
        } else {
            setAuthExpiration(req)
        }
    }

    return next()
}

export function isLoggedIn(req: HandlerRequest) {
    return !!req.session?.auth
}

export function logIn(req: HandlerRequest) {
    if(!req.session) return false

    req.session.auth = true
    setAuthExpiration(req)

    return true
}

export function logOut(req: HandlerRequest) {
    req.session = null
}

export function setAuthExpiration(req: HandlerRequest) {
    if(!req.session) return

    // req.session.expires = addMinutes(new Date(), 5)
}