import { FunctionComponent } from "react";
import type { GetServerSideProps } from "next";
import { getCookieString } from "../../../lib/functions";
import { ContactData } from "../../../models/contact";

interface PageConfirmIdProps {
    user: Document | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        let user = await ContactData.findOne({ id: context.params?.id });

        if ( user ) {
            user.isVerified = true;
            user = await user.save();

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
            { user ? "Your email has been successfully verified" : "This id does not exist" }
        </h1>
    )
}

export default ConfirmEmailPage;