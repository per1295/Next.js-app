import MainServicesSecondGroupPlansPlan from "./MainServicesSecondGroupPlansPlan";
import styles from "../../styles/services/TheMainServicesSecondGroupPlans.module.scss";

export default function TheMainServicesSecondGroupPlans() {
    const planTitles = [
        "BASIC", "ADVANCED", "smart"
    ];

    const planPrices = [
        "$35.99 Monthly", "$55.99 Monthly", "$75.99 Monthly"
    ];

    return(
        <div className={styles.mainServices_secondGroup__plans}>
            {
                planTitles.map((item, index) => (
                    <MainServicesSecondGroupPlansPlan key={index} title={item} price={planPrices[index]}/>
                ))
            }
        </div>
    )
}