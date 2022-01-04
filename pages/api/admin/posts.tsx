import { requireLoggedIn } from "server/api/auth";
import handler from "server/api/handler";
import { database } from "server/db";
import { getPosts } from "server/db/posts";

export default handler()
    .get(requireLoggedIn, async (req, res, next) => {
        const db = await database()

        const posts = await getPosts(db, { includeDrafts: true })

        res.json({data: posts})
    })