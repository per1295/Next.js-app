import { NextApiHandler } from "next";
import { IContactData } from "../../../types/contact";
import { createResponse, setCookies } from "../../../lib/functions";
import init from "../../../lib/init";

const handler: NextApiHandler = async (req, res) => {
    try {
        if ( req.method?.toLowerCase() !== "post" ) throw new Error("Wrong request method");

        await init();

        const connection = globalThis.connection;
        const transport = globalThis.transport;

        const { name, email, object, message } = req.body as IContactData;

        const [ rows ] = await connection.execute<any[]>(
            `SELECT * FROM contactData WHERE email = ?`,
            [ email ]
        );

        let existUser = rows[0];

        if ( existUser ) {
            const { id, firstName, email, objectString, messageString, isVerified } = existUser;

            setCookies(
                res,
                [ "id", "name", "email", "object", "message", "isVerified" ],
                [ id, firstName, email, objectString, messageString, isVerified ]
            );

            return res.json(createResponse({
                status: "success",
                message: existUser.isVerified ? "This user already exist" : "This user needs verification"
            }));
        }

        await connection.execute(
            `INSERT INTO contactData (firstName, email, objectString, messageString) VALUES (?, ?, ?, ?)`,
            [ name, email, object, message ]
        );

        const [ newRows ] = await connection.execute<any[]>(
            `SELECT * FROM contactData WHERE email = ?`,
            [ email ]
        );

        const newUser = newRows[0];
        const { id, firstName, email: userEmail, objectString, messageString, isVerified } = newUser;

        const reqURL = req.headers.referer as string;
        const url = new URL(reqURL);

        let confirmURLAdress = `${url.protocol}//${url.host}/contact/confirmEmail/${id}`;
        
        await transport.sendMail({
            from: process.env.APP_EMAIL,
            to: userEmail,
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

        setCookies(
            res,
            [ "idOfUser", "name", "userEmail", "object", "message", "userIsVerified" ],
            [ id, firstName, userEmail, objectString, messageString, isVerified ]
        );

        res.json(createResponse({
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