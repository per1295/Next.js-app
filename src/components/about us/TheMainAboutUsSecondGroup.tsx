import styles from "../../styles/about us/TheMainAboutUsSecondGroup.module.scss";
import TitleOfGroup from "../../globalComponents/TitleOfGroup";
import TheMainAboutUsSecondGroupOptions from "./TheMainAboutUsSecondGroupOptions";

export default function TheMainAboutUsSecondGroup() {
    return(
        <div className={styles.mainAboutUs_secondGroup}>
            <TitleOfGroup
            appendedClassNameInformation={styles.mainAboutUs_secondGroup_titleOfGroup_information}
            appendedClassNameTitleGreenBlock={styles.mainAboutUs_secondGroup_titleOfGroup_title_greenBlock}>
                some benefits
            </TitleOfGroup>
            <TheMainAboutUsSecondGroupOptions/>
        </div>
    )
}