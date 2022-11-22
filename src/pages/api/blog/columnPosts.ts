import { NextApiHandler } from "next";
import { ColumnPost } from "../../../models/blog";
import { createResponse } from "../../../lib/functions";
import init from "../../../lib/init";

const handler: NextApiHandler = async (req, res) => {
    try {
        if ( req.method?.toLowerCase() !== "get" ) throw new Error("Wrong request method");

        await init();

        const columnPosts = await ColumnPost.find({}, { _id: 0 });
        res.json(createResponse({
            status: "success",
            message: columnPosts
        }));
    } catch (error) {
        const err = error as Error;
        console.log(`${err.name}: ${err.message}`);
    }
}

export default handler;