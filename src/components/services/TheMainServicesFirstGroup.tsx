import TitleOfGroup from "../../globalComponents/TitleOfGroup";
import TheMainServicesFirstGroupMain from "./TheMainServicesFirstGroupMain";
import TheMainServicesFirstGroupUnder from "./TheMainServicesFirstGroupUnder";
import styles from "../../styles/services/TheMainServicesFirstGroup.module.scss";

export default function TheMainServicesFirstGroup() {
    return(
        <div className={styles.mainServices_firstGroup}>
            <TitleOfGroup
            appendedClassNameTitleGreenBlock={styles.mainServices_firstGroup_titleOfGroup_title_greenBlock}
            appendedClassNameInformation={styles.mainServices_firstGroup_titleOfGroup_information} >
                What we do
            </TitleOfGroup>
            <TheMainServicesFirstGroupMain/>
            <TheMainServicesFirstGroupUnder/>
        </div>
    )
}