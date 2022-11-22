import TitleOfGroup from "../../globalComponents/TitleOfGroup";
import styles from "../../styles/about us/TheMainAboutUsThirdGroup.module.scss";
import TheMainAboutUsThirdGroupTeam from "./TheMainAboutUsThirdGroupTeam";
import TheMainAboutUsThirdGroupUnderTeam from "./TheMainAboutUsThirdGroupUnderTeam";
import TheMainAboutUsThirdGroupBottom from "./TheMainAboutUsThirdGroupBottom";

export default function TheMainAboutUsThirdGroup() {
    return(
        <div className={styles.mainAboutUs_thirdGroup}>
            <TitleOfGroup
            appendedClassNameInformation={styles.mainAboutUs_thirdGroup_titleOfGroup_information}
            appendedClassNameTitleGreenBlock={styles.mainAboutUs_thirdGroup_titleOfGroup_title_greenBlock}
            >
                THE DREAM TEAM
            </TitleOfGroup>
            <TheMainAboutUsThirdGroupTeam/>
            <TheMainAboutUsThirdGroupUnderTeam/>
            <TheMainAboutUsThirdGroupBottom/>
        </div>
    )
}