import { FunctionComponent } from "react";
import type { Document } from "mongoose";
import type { GetServerSideProps } from "next";
import { Email } from "../../../models/home";
import { getCookieString } from "../../../lib/functions";

interface PageConfirmIdProps {
    email: Document | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        let email = await Email.findOne({ id: context.params?.id });

        if ( email ) {
            email.isVerified = true;
            email = await email.save();

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
            { email ? "Your email has been successfully verified" : "This id does not exist" }
        </h1>
    )
}

export default ConfirmEmailPage;