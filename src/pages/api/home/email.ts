import type { NextApiHandler } from "next";
import { IEmailData } from "../../../types/home";
import { createResponse, getCookieString } from "../../../lib/functions";
import { Email } from "../../../models/home";
import init from "../../../lib/init";

const handler: NextApiHandler = async (req, res) => {
    try {
        if ( req.method?.toLowerCase() !== "post" ) throw new Error("Wrong request method");

        await init();

        const { email } = req.body as Pick<IEmailData, "email">;

        const emailDocument = await Email.findOne({ email });
        if ( emailDocument ) {
            const { isVerified } = emailDocument;
            return res
                .json(createResponse({
                    status: "success",
                    message: isVerified ? "This email already exist" : "This email needs verification"
                }));
        }

        const randomId = Math.floor(Math.random() * 1e6);
        let newEmail = new Email({ id: randomId, email });
        newEmail = await newEmail.save();

        const reqURL = req.headers.referer as string;
        const url = new URL(reqURL);

        let confirmURLAdress = `${url.protocol}://${url.host}/home/confirmEmail`;

        await transport.sendMail({
            from: process.env.APP_EMAIL,
            to: newEmail.email,
            subject: "Confirm your email.",
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
        .setHeader("Set-Cookie", getCookieString("id", newEmail.id))
        .setHeader("Set-Cookie", getCookieString("email", newEmail.email))
        .setHeader("Set-Cookie", getCookieString("isVerified", newEmail.isVerified))
        .json(createResponse({
            status: "success",
            message: "Follow the link sent to you to confirm your email"
        }));
    } catch (error) {
        const errorTyped = error as Error;
        console.error(`${errorTyped.name}: ${errorTyped.message}`);

        res.status(404).json(createResponse({
            status: "fail",
            message: "Unknown error"
        }));
    }
};

export default handler;