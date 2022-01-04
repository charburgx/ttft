import { Joi } from "express-validation";
import { Post } from "models/post";
import { ObjectId } from "mongodb";
import { requireLoggedIn } from "server/api/auth";
import handler from "server/api/handler"
import { validate } from "server/api/validation"
import { database } from "server/db";
import { genSlug } from "server/utils";

export default handler()
    .put(requireLoggedIn,
        validate({
            body: Joi.object({
                title: Joi.string().required().min(1),
                image: Joi.string().empty(''),
                content: Joi.string().empty(''),
                draftContent: Joi.string().empty(''),
                draft: Joi.boolean(),
                featured: Joi.boolean(),
                categories: Joi.array().items(Joi.string()),
                relatedPosts: Joi.array().items(Joi.string()),
                slug: Joi.string().empty('')
            })
        }),
        async (req, res) => {
            const data = req.body as Pick<Post, 'title'> & Omit<Partial<Post>, 'title'|'relatedPosts'> & { relatedPosts: string[] }

            let { slug, relatedPosts } = data
            
            if(!slug) slug = genSlug(data.title)

            const relatedPostObjIds = relatedPosts?.map(id => new ObjectId(id))

            const { title, image, content, draftContent, draft, featured, categories } = data

            const db = await database()

            const isDraft = (await db.collection('posts').findOne({slug}, { projection: { published_at: 1 }}))?.draft as boolean|undefined

            const pubField = isDraft && !draft ? { published_at: new Date() } : {}

            const result = await db
                .collection('posts')
                .updateOne({ slug }, { $set: { title, image, content, draftContent, draft, featured, categories, relatedPosts: relatedPostObjIds, updated_at: new Date(), ...pubField }, $setOnInsert: { slug, created_at: new Date() } }, { upsert: true })
                
            res.json({
                success: true,
                data: {
                    slug
                }
            })
    })