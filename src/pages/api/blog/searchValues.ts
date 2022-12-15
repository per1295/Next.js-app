import type { NextApiHandler } from "next";
import type { ISearchInput } from "../../../types/blog";
import { getCookieString, createResponse } from "../../../lib/functions";
import init from "../../../lib/init";

const handler: NextApiHandler = async (req, res) => {
    try {
        if ( req.method?.toLowerCase() !== "post" ) throw new Error("Wrong request method");

        await init();

        const connection = globalThis.connection;

        const { value } = req.body as ISearchInput;

        await connection.execute(`INSERT INTO searchValues (valueString) VALUES (?)`, [ value ]);

        const [ rows ] = await connection.execute<any[]>(`SELECT * FROM searchValues`);

        const cookieValues = rows.map(item => item?.valueString);
        
        res
        .setHeader("Set-Cookie", getCookieString("search-input", cookieValues.join("_")))
        .json(createResponse({
            status: "success",
            message: "Your search is saved"
        }));
    } catch (error) {
        const err = error as Error;
        console.log(`${err.name}: ${err.message}`);
    }
}

export default handler;