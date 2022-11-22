import styles from "../globalStyles/TheHeaderTop.module.scss";
import TheHeaderTopMenu from "./TheHeaderTopMenu";
import TheHeaderTopMenuNavLinks from "./TheHeaderTopNavLinks";
import { useTypedSelector } from "../lib/customHooks";
import Link from "next/link";

const TheHeaderTop = () => {
    const isMobile = useTypedSelector<"isMobile">((state) => state.isMobile);

    return(
        <div className={styles.header_top}>
            <Link href="/home" className={styles.header_top__homelink}>akad.</Link>
            { isMobile ? null : <TheHeaderTopMenuNavLinks/> }
            <TheHeaderTopMenu/>
        </div>
    )
}

export default TheHeaderTop;