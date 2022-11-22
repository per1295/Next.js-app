import type { NextApiHandler } from "next";
import type { ISearchInput, ISearchInputSchema } from "../../../types/blog";
import type { Document, Types } from "mongoose";
import { SearchInput } from "../../../models/blog";
import { getCookieString, createResponse } from "../../../lib/functions";
import init from "../../../lib/init";

const handler: NextApiHandler = async (req, res) => {
    try {
        if ( req.method?.toLowerCase() !== "post" ) throw new Error("Wrong request method");

        await init();

        const { value } = req.body as ISearchInput;

        const searchInput = await SearchInput.findOne({});
        let newSearchInput: (Document<unknown, any, ISearchInputSchema> & ISearchInputSchema & {
            _id: Types.ObjectId;
        });

        if ( searchInput ) {
            searchInput.values.push(value);
            newSearchInput = await searchInput.save();
        } else {
            newSearchInput = new SearchInput({ values: [ value ] });
            newSearchInput = await newSearchInput.save();
        };
        
        res
        .setHeader("Set-Cookie", getCookieString("search-input", newSearchInput.values.join("_")))
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