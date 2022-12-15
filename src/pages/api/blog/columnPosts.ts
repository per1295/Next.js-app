import { NextApiHandler } from "next";
import { createResponse } from "../../../lib/functions";
import init from "../../../lib/init";

const handler: NextApiHandler = async (req, res) => {
    try {
        if ( req.method?.toLowerCase() !== "get" ) throw new Error("Wrong request method");

        await init();

        const connection = globalThis.connection;

        const [ rows ] = await connection.execute<any[]>(`SELECT * from columnPosts`);

        res.json(createResponse({
            status: "success",
            message: rows
        }));
    } catch (error) {
        const err = error as Error;
        console.log(`${err.name}: ${err.message}`);
    }
}

export default handler;