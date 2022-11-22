import TitleOfGroup from "../../globalComponents/TitleOfGroup";
import TheMainSecondGroupCategory from "./TheMainSecondGroupCaterory";
import styles from "../../styles/home/TheMainSecondGroup.module.scss";

export default function TheMainSecondGroup() {
    return(
        <div className={styles.main_secondGroup}>
            <TitleOfGroup
            appendedClassNameTitleGreenBlock={styles.main_secondGroup_titleOfGroup_title_greenBlock}
            appendedClassNameInformation={styles.main_secondGroup_titleOfGroup_information}>
                our portfolio
            </TitleOfGroup>
            <TheMainSecondGroupCategory/>
        </div>
    )
}