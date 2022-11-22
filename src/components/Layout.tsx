import { FunctionComponent } from "react";
import TheFooter from "../globalComponents/TheFooter";
import TheHeader from "../globalComponents/TheHeader";
import TheHomeHeader from "./home/TheHeader";
import { useRouter } from "next/router";

interface LayoutProps {
    children: JSX.Element;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
    const router = useRouter();

    return(
        <>
            { /^\/home/i.test(router.pathname) ? <TheHomeHeader/> : <TheHeader/> }
            { children }
            <TheFooter/>
        </>
    )
};

export default Layout;