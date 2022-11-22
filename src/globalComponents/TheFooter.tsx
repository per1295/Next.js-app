import styles from "../globalStyles/TheFooter.module.scss";
import TheFooterConteiner from "./TheFooterConteiner";

export default function TheFooter() {
    return(
        <footer className={styles.footer}>
            <TheFooterConteiner/>
        </footer>
    )
}