import { requireLoggedIn } from "server/api/auth";
import handler from "server/api/handler";
import { database } from "server/db";

export default handler()
    .get(requireLoggedIn, async (req, res) => {
        const db = await database()

        const data = await db.collection('posts')
            .find({})
            .project({_id: 1, title: 1})
            .toArray()

        res.json({ data })
    })