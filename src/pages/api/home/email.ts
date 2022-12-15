import type { NextApiHandler } from "next";
import { IEmailData } from "../../../types/home";
import { createResponse, setCookies } from "../../../lib/functions";
import init from "../../../lib/init";

const handler: NextApiHandler = async (req, res) => {
    try {
        if ( req.method?.toLowerCase() !== "post" ) throw new Error("Wrong request method");

        await init();

        const connection = globalThis.connection;
        const transport = globalThis.transport;

        const { email } = req.body as Pick<IEmailData, "email">;

        const [ rows ] = await connection.execute<any[]>(
            `SELECT * FROM emails WHERE email = ?`,
            [ email ]
        );

        const emailDocument = rows[0];
        if ( emailDocument ) {
            const { isVerified } = emailDocument;
            return res
                .json(createResponse({
                    status: "success",
                    message: isVerified ? "This email already exist" : "This email needs verification"
                }));
        }

        await connection.execute(`INSERT INTO emails (email) VALUES (?)`, [ email ]);

        const [ newRows ] = await connection.execute<any[]>(`SELECT * FROM emails WHERE email = ?`, [ email ]);

        let newEmail = newRows[0];
        const { id, email: nEmail, isVerified } = newEmail;

        const reqURL = req.headers.referer as string;
        const url = new URL(reqURL);

        let confirmURLAdress = `${url.protocol}//${url.host}/home/confirmEmail/${id}`;

        await transport.sendMail({
            from: process.env.APP_EMAIL,
            to: nEmail,
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

        setCookies(
            res,
            [ "idOfEmail", "email", "emailIsVerified" ],
            [ id, nEmail, isVerified ]
        );

        res.json(createResponse({
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