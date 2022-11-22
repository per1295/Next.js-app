import { FunctionComponent } from "react";
import IonIcon from "@reacticons/ionicons";
import styles from "../../styles/services/CheckboxLine.module.scss";

interface CheckboxLineProps {
    children: string | JSX.Element;
}

const CheckboxLine: FunctionComponent<CheckboxLineProps> = ({ children }) => {
    return(
        <div className={styles.checkboxLine}>
            <IonIcon name="checkbox-outline" className={styles.checkboxLine_icon}/>
            <span className={styles.checkboxLine_title}>
                { children }
            </span>
        </div>
    )
}

export default CheckboxLine;