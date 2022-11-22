import { NextApiHandler } from "next";
import { createResponse, getBlogs, patchBlogs } from "../../../lib/functions";
import init from "../../../lib/init";

const handler: NextApiHandler = async (req, res) => {
    try {
        const method = req.method?.toLocaleLowerCase();

        await init();

        switch(method) {
            case "get":
                await getBlogs(req, res);
                break;
            case "patch":
                await patchBlogs(req, res);
                break;
            default:
                throw new Error("Wrong request method");
        }
    } catch (error) {
        const errorTyped = error as Error;
        console.error(`${errorTyped.name}: ${errorTyped.message}`);
        res.status(404).json(createResponse({
            status: "fail",
            message: "Unknown error"
        }));
    }
}

export default handler;