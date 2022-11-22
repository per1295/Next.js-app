import { NextApiHandler } from "next";
import { IContactData } from "../../../types/contact";
import { createResponse, getCookieString } from "../../../lib/functions";
import { ContactData } from "../../../models/contact";
import init from "../../../lib/init";

const handler: NextApiHandler = async (req, res) => {
    try {
        if ( req.method?.toLowerCase() !== "post" ) throw new Error("Wrong request method");

        await init();

        const { name, email, object, message } = req.body as IContactData;

        let existUser = await ContactData.findOne({ email });

        if ( existUser ) {
            return res
            .setHeader("Set-Cookie", getCookieString("id", existUser.id))
            .setHeader("Set-Cookie", getCookieString("name", existUser.name))
            .setHeader("Set-Cookie", getCookieString("email", existUser.email))
            .setHeader("Set-Cookie", getCookieString("object", existUser.object))
            .setHeader("Set-Cookie", getCookieString("message", existUser.message))
            .setHeader("Set-Cookie", getCookieString("isVerified", existUser.isVerified))
            .json(createResponse({
                status: "success",
                message: existUser.isVerified ? "This user already exist" : "This user needs verification"
            }));
        }

        const randomId = Math.floor(Math.random() * 1e6);
        const newUser = new ContactData({ id: randomId, name, email, object, message });
        const user = await newUser.save();

        const reqURL = req.headers.referer as string;
        const url = new URL(reqURL);

        let confirmURLAdress = `${url.protocol}://${url.host}/home/confirmEmail`;

        await transport.sendMail({
            from: process.env.APP_EMAIL,
            to: user.email,
            subject: "Confirm your form",
            html: `
                <h1>
                    Follow the link: <a href="${confirmURLAdress}">${confirmURLAdress}</a>
                </h1>
            `,
            text: `
                Follow the link: ${confirmURLAdress}
            `
        });

        res
        .setHeader("Set-Cookie", getCookieString("id", user.id))
        .setHeader("Set-Cookie", getCookieString("name", user.name))
        .setHeader("Set-Cookie", getCookieString("email", user.email))
        .setHeader("Set-Cookie", getCookieString("object", user.object))
        .setHeader("Set-Cookie", getCookieString("message", user.message))
        .setHeader("Set-Cookie", getCookieString("isVerified", user.isVerified))
        .json(createResponse({
            status: "success",
            message: "Confirm your data by email"
        }));
    } catch (error) {
        const err = error as Error;
        console.error(`${err.name}: ${err.message}`);
        res.status(404).json(createResponse({
            status: "fail",
            message: "Unknown error"
        }));
    }
}

export default handler;