import { Joi } from "express-validation";
import { requireLoggedIn } from "server/api/auth";
import handler from "server/api/handler";
import { validate } from "server/api/validation";
import { database } from "server/db";

export default handler()
    .delete(requireLoggedIn, validate({
        query: Joi.object({
            name: Joi.string()
        })
    }), async (req, res) => {
        const db = await database()

        const name = req.query.name as string

        const result = await db
            .collection('categories')
            .deleteOne({name})

        const result2 = await db
            .collection('posts')
            .updateMany({categories: name}, {
                // @ts-ignore
                $pull: { categories: name }
            })

        res.json({
            success: true
        })
    })