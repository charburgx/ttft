import { Joi } from "express-validation";
import { requireLoggedIn } from "server/api/auth";
import { NotFoundError } from "server/api/errors";
import handler from "server/api/handler";
import { validate } from "server/api/validation";
import { database } from "server/db";

export default handler()
    .get(requireLoggedIn, validate({
        query: {
            slug: Joi.string().min(1)
        }
    }), async (req, res) => {
        const db = await database()
        
        const { slug } = req.query as { slug: string }

        const post = await db.collection('posts').findOne({slug})

        if(!post) throw new NotFoundError("Post not found")

        res.json(post)
    })