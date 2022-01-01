import { requireLoggedIn } from "server/api/auth";
import handler from "server/api/handler";

export default handler()
    .get(requireLoggedIn, (req, res) => {
        res.json({
            auth: true
        })
    })