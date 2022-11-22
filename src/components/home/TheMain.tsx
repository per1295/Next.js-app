import styles from "../../styles/home/TheMain.module.scss";
import TheMainFirstGroup from "./TheMainFirstGroup";
import TheMainSecondGroup from "./TheMainSecondGroup";
import TheMainThirdGroup from "../../globalComponents/TheMainThirdGroup";

export default function TheMain() {
    return(
        <main className={styles.mainHome}>
            <TheMainFirstGroup/>
            <TheMainSecondGroup/>
            <TheMainThirdGroup/>
        </main>
    )
}