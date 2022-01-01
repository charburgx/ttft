import { logOut, requireLoggedIn } from "server/api/auth";
import handler from "server/api/handler";

export default handler()
    .post(requireLoggedIn, (req, res) => {
        console.log("1")

        logOut(req)

        res.json({success: true})
    })