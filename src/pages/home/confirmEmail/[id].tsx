import { FunctionComponent } from "react";
import type { GetServerSideProps } from "next";
import { getCookieString } from "../../../lib/functions";
import type { ParsedUrlQuery } from "querystring";

interface PageConfirmIdProps {
    email: Document | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const connection = globalThis.connection;
        const { id } = context.params as ParsedUrlQuery;
        const [ rows ] = await connection.query<any[]>(`SELECT * FROM emails WHERE id = ?`, [ id ]);
        const email = rows[0];

        if ( email ) {
            await connection.query(`UPDATE emails SET isVerified = TRUE WHERE id = ?`, [ id ]);

            context.res.setHeader("Set-Cookie", getCookieString("isVerified", true));
        }

        return {
            props: { email }
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
}

const ConfirmEmailPage: FunctionComponent<PageConfirmIdProps> = ({ email }) => {
    return(
        <h1>
            { email ? "Your email has been successfully verified" : "Email`s id does not exist" }
        </h1>
    )
}

export default ConfirmEmailPage;