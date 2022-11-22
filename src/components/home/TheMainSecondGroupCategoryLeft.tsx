import styles from "../../styles/home/TheMainSecondGroupCategoryLeft.module.scss";
import TheMainSecondGroupCategoryLeftOptions from "./TheMainSecondGroupCategoryLeftOptions";

export default function TheMainSecondGroupCategoryLeft() {
    return(
        <div className={styles.main_secondGroup__category___left}>
            <span className={styles.main_secondGroup__category___left____title}>
                choose category
            </span>
            <TheMainSecondGroupCategoryLeftOptions/>
        </div>
    )
}