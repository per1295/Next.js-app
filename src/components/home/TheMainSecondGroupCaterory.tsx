import styles from "../../styles/home/TheMainSecondGroupCategory.module.scss";
import TheMainSecondGroupCategoryLeft from "./TheMainSecondGroupCategoryLeft";
import TheMainSecondGroupCategoryRight from "./TheMainSecondGroupCategoryRight";

export default function TheMainSecondGroupCategory() {
    return(
        <div className={styles.main_secondGroup__category}>
            <TheMainSecondGroupCategoryLeft/>
            <TheMainSecondGroupCategoryRight/>
        </div>
    )
}