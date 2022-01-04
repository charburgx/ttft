import { requireLoggedIn } from "server/api/auth";
import handler from "server/api/handler";
import { database } from "server/db";

export default handler()
    .get(requireLoggedIn, async (req, res) => {
        const db = await database()

        const catlist = (await db.collection('categories')
        .find().toArray()).map(cat => cat.name)

        res.json({
            catlist
        })
    })