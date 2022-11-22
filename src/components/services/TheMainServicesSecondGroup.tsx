import TitleOfGroup from "../../globalComponents/TitleOfGroup";
import TheMainServicesSecondGroupPlans from "./TheMainServicesSecondGroupPlans";
import styles from "../../styles/services/TheMainServicesSecondGroup.module.scss";

export default function TheMainServicesSecondGroup() {
    return(
        <div className={styles.mainServices_secondGroup}>
            <TitleOfGroup
            appendedClassNameTitleGreenBlock={styles.mainServices_secondGroup_titleOfGroup_title_greenBlock}
            appendedClassNameInformation={styles.mainServices_secondGroup_titleOfGroup_information} >
                pricing plans
            </TitleOfGroup>
            <TheMainServicesSecondGroupPlans/>
        </div>
    )
}