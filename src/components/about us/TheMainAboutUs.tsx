import styles from "../../styles/about us/TheMainAboutUs.module.scss";
import TheMainAboutUsFirstGroup from "./TheMainAboutUsFirstGroup";
import TheMainAboutUsSecondGroup from "./TheMainAboutUsSecondGroup";
import TheMainAboutUsThirdGroup from "./TheMainAboutUsThirdGroup";
import TheMainThirdGroup from "../../globalComponents/TheMainThirdGroup";

export default function TheMainAboutUs() {
    return(
        <main className={styles.mainAboutUs}>
            <TheMainAboutUsFirstGroup/>
            <TheMainAboutUsSecondGroup/>
            <TheMainAboutUsThirdGroup/>
            <TheMainThirdGroup/>
        </main>
    )
}