import { Joi } from "express-validation";
import { requireLoggedIn } from "server/api/auth";
import handler from "server/api/handler";
import { validate } from "server/api/validation";
import { database } from "server/db";

export default handler()
    .post(requireLoggedIn, validate({
        body: Joi.object({
            name: Joi.string()
        })
    }), async (req, res) => {
        const db = await database()

        const { name } = req.body as {name: string}

        const result = await db
            .collection('categories')
            .insertOne({ name })

        res.json({
            success: true
        })
    })