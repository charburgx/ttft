import { Joi } from "express-validation";
import { requireLoggedIn } from "server/api/auth";
import handler from "server/api/handler";
import { validate } from "server/api/validation";
import { database } from "server/db";
import { getPost } from "server/db/posts";

export default handler()
    .get(requireLoggedIn, validate({
        query: Joi.object({
            slug: Joi.string()
        })
    }), async (req, res) => {
        const slug = req.query.slug as string

        const db = await database()

        const post = await getPost(db, slug, { draftContent: true })

        res.json({data: post})
    })