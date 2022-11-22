import styles from "../../styles/contact/TheMainContactConteinerLeft.module.scss";
import TheMainContactConteinerLeftForm from "./TheMainContactConteinerLeftForm";
import TheMainContactConteinerLeftInfo from "./TheMainContactConteinerLeftInfo";

export default function TheMainContactConteinerLeft() {
    return(
        <div className={styles.mainContact_conteiner__left}>
            <TheMainContactConteinerLeftForm/>
            <TheMainContactConteinerLeftInfo/>
        </div>
    )
}