import { Joi } from "express-validation"
import handler from "server/api/handler"
import { validate } from "server/api/validation"
import { compare } from "bcrypt"
import { AuthenticationError } from "server/api/errors"
import { logIn } from "server/api/auth"

const { PASSWORD_HASH } = process.env

if(!PASSWORD_HASH) throw new Error('PASSWORD_HASH not set!!')

export default handler()
    .post(validate({
        body: Joi.object({
            password: Joi
                .string()
                .required()
                .min(1)
        })
    }), async (req, res) => {
        const { password } = req.body as { password: string }

        const verified = await compare(password, PASSWORD_HASH)

        if(!verified) throw new AuthenticationError("Invalid login details")

        logIn(req)

        res.json({ success: true })
    })