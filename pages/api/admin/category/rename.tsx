import { Joi } from "express-validation";
import { requireLoggedIn } from "server/api/auth";
import handler from "server/api/handler";
import { validate } from "server/api/validation";
import { database } from "server/db";

export default handler()
    .put(requireLoggedIn, validate({
        body: Joi.object({
            name: Joi.string(),
            new_name: Joi.string()
        })
    }), async (req, res) => {
        const db = await database()

        const { name, new_name } = req.body as { name: string, new_name: string }

        const result = await db
            .collection('categories')
            .updateOne({name}, {$set: {name: new_name}})

        const result2 = await db
            .collection('posts')
            .updateMany({ categories: name }, { $set: { "categories.$": new_name } } )

        res.json({
            success: true
        })
    })