import styles from "../globalStyles/TheMainThirdGroupConteinerRightConteiner.module.scss";
import TheConteinerTitle from "./TheConteinerTitle";
import TheConteinerDescription from "./TheConteinerDescription";
import TheConteinerEmail from "./TheConteinerEmail";

export default function TheMainThirdGroupConteinerRightConteiner() {
    return(
        <div className={styles.main_thirdGroup__conteiner___right____conteiner}>
            <TheConteinerTitle/>
            <TheConteinerDescription/>
            <TheConteinerEmail/>
        </div>
    )
}