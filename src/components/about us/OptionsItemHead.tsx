import { FunctionComponent } from "react";
import IonIcon from "@reacticons/ionicons";
import IconList from "@reacticons/ionicons/lib/components/iconList.json";
import styles from "../../styles/about us/OptionsItemHead.module.scss";

interface OptionsItemHeadProps {
    iconName: keyof typeof IconList;
    title: string;
}

const OptionsItemHead: FunctionComponent<OptionsItemHeadProps> = ({ iconName, title }) => {
    return(
        <div className={styles.options_item__head}>
            <div className={styles.options_item__head___icon}>
                <IonIcon name={iconName} className={styles.options_item__head___icon____content}/>
            </div>
            <span className={styles.options_item__head___title}>
                { title }
            </span>
        </div>
    )
}

export default OptionsItemHead;