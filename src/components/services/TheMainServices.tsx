import TheMainServicesFirstGroup from "./TheMainServicesFirstGroup";
import TheMainServicesSecondGroup from "./TheMainServicesSecondGroup";
import styles from "../../styles/services/TheMainServices.module.scss";

export default function TheMainServices() {
    return(
        <main className={styles.mainServices}>
            <TheMainServicesFirstGroup/>
            <TheMainServicesSecondGroup/>
        </main>
    )
}