import { FunctionComponent } from "react";
import type { GetServerSideProps } from "next";
import { getCookieString } from "../../../lib/functions";
import type { ParsedUrlQuery } from "querystring";

interface PageConfirmIdProps {
    user: Document | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const connection = globalThis.connection;
        const { id } = context.params as ParsedUrlQuery;
        const [ rows ] = await connection.query<any[]>(`SELECT * FROM contactData WHERE id = ?`, [ id ]);
        const user = rows[0];
        console.log(user);

        if ( user ) {
            await connection.query(`UPDATE contactData SET isVerified = TRUE WHERE id = ?`, [ id ]);

            context.res.setHeader("Set-Cookie", getCookieString("isVerified", true));
        }

        return {
            props: { user }
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
}

const ConfirmEmailPage: FunctionComponent<PageConfirmIdProps> = ({ user }) => {
    return(
        <h1>
            { user ? "Your data has been successfully verified" : "User`s id does not exist" }
        </h1>
    )
}

export default ConfirmEmailPage;