import styles from "../globalStyles/TheMainThirdGroupConteiner.module.scss";
import TheMainThirdGroupConteinerLeft from "./TheMainThirdGroupConteinerLeft";
import TheMainThirdGroupConteinerRight from "./TheMainThirdGroupConteinerRight";

export default function TheMainThirdGroupConteiner() {
    return(
        <div className={styles.main_thirdGroup__conteiner}>
            <TheMainThirdGroupConteinerLeft/>
            <TheMainThirdGroupConteinerRight/>
        </div>
    )
}