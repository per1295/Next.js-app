import styles from "../../styles/contact/TheMainContact.module.scss";
import TheMainContactConteiner from "./TheMainContactConteiner";
import TheMainThirdGroup from "../../globalComponents/TheMainThirdGroup";

export default function TheMainContact() {
    return(
        <main className={styles.mainContact}>
            <TheMainContactConteiner/>
            <TheMainThirdGroup/>
        </main>
    )
}