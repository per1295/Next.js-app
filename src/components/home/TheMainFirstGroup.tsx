import TitleOfGroup from "../../globalComponents/TitleOfGroup";
import styles from "../../styles/home/TheMainFirstGroup.module.scss";
import TheMainFirstGroupBody from "./TheMainFirstGroupBody";

export default function TheMainFirstGroup() {
    return(
        <div className={styles.main_firstGroup}>
            <TitleOfGroup
            appendedClassNameInformation={styles.main_firstGroup_titleOfGroup_information}
            appendedClassNameTitleGreenBlock={styles.main_firstGroup_titleOfGroup_title_greenBlock} >
                why choose us
            </TitleOfGroup>
            <TheMainFirstGroupBody/>
        </div>
    )
}