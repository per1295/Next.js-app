import { FunctionComponent } from "react";
import styles from "../globalStyles/TheHeaderMain.module.scss";

interface TheHeaderMainProps {
    title: string;
    underTitle: string;
}

const TheHeaderMain: FunctionComponent<TheHeaderMainProps> = ({ title, underTitle }) => {
    return(
        <div className={styles.headerOther_main}>
            <span className={styles.headerOther_main__title}>
                { title }
            </span>
            <span className={styles.headerOther_main__underTitle}>
                { underTitle }
            </span>
        </div>
    )
}

export default TheHeaderMain;