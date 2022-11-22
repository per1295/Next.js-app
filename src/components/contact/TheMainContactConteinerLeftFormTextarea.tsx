import styles from "../../styles/contact/TheMainContactConteinerLeftFormTextarea.module.scss";

export default function TheMainContactConteinerLeftFormTextarea() {
    return(
        <textarea
        name="message"
        className={styles.mainContact_conteiner__left___form____textarea}
        placeholder="message"
        ></textarea>
    )
}