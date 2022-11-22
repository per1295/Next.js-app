import styles from "../../styles/services/TheMainServicesFirstGroupUnder.module.scss";
import MainServicesFirstGroupUnderItem from "./MainServicesFirstGroupUnderItem";
import IconList from "@reacticons/ionicons/lib/components/iconList.json";

export default function TheMainServicesFirstGroupUnder() {
    const titles = [
        "KEEP PULSE GOING", "PASS THE LIMITS", "GREAT IDEAS", "AWESOME SUPPORT"
    ];

    const icons = [
        "analytics-outline", "infinite-outline", "flash-outline", "options-outline"
    ] as (keyof typeof IconList)[];

    return(
        <div className={styles.mainServices_firstGroup__under}>
            {
                icons.map((icon, index) => (
                    <MainServicesFirstGroupUnderItem key={index} iconName={icon} title={titles[index]}/>
                ))
            }
        </div>
    )
}