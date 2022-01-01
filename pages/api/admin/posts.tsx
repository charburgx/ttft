import { requireLoggedIn } from "server/api/auth";
import handler from "server/api/handler";
import { database } from "server/db";

export default handler()
    .get(requireLoggedIn, async (req, res, next) => {
        const db = await database()
        const posts = await db.collection("posts")
            .find()
            .toArray()
        
        res.json(posts)
    })