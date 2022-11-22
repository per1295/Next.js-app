import { useState, useEffect } from "react";
import TheHeaderTop from "./TheHeaderTop";
import styles from "../globalStyles/TheHeader.module.scss";
import TheHeaderMain from "./TheHeaderMain";
import { useTypedSelector } from "../lib/customHooks";
import TheHeaderNavLinksMobile from "./TheHeaderNavLinksMobile";
import { useRouter } from "next/router";

export default function TheHeader() {
    const isMobile = useTypedSelector<"isMobile">(state => state.isMobile);
    const router = useRouter();
    const [ props, setProps ] = useState([ "contact us", "home / contact" ]);

    useEffect(() => {
        interface HeaderMainProps {
            [key: string]: string[];
        }

        const headerMainProps = Object.freeze<HeaderMainProps>({
            Services: [ "our services", "home / services" ],
            Blog: [ "blog posts", "home / blog" ],
            Contact: [ "contact us", "home / contact" ],
            About: [ "about us", "home / about" ]
        });
    
        const pageKey = Object.keys(headerMainProps).find(item => (new RegExp(`^/${item}`, "i")).test(router.pathname));
    
        setProps(headerMainProps[pageKey ?? "Contact"]);
    }, [ router.pathname ]);

    return(
        <header className={styles.headerOther}>
            <TheHeaderTop/>
            { isMobile ? <TheHeaderNavLinksMobile/> : null }
            <TheHeaderMain title={props[0]} underTitle={props[1]}/>
        </header>
    )
}