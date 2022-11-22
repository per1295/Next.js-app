import { FunctionComponent } from "react";
import IonIcon from "@reacticons/ionicons";
import IconList from "@reacticons/ionicons/lib/components/iconList.json";
import GreenBlock from "../../globalComponents/GreenBlock";
import Information from "../../globalComponents/Information";
import styles from "../../styles/services/MainServicesFirstGroupUnderItem.module.scss";

interface MainServicesFirstGroupUnderItemProps {
    iconName: keyof typeof IconList;
    title: string;
}

const MainServicesFirstGroupUnderItem: FunctionComponent<MainServicesFirstGroupUnderItemProps> = ({ iconName, title }) => {
    return(
        <div className={styles.mainServices_firstGroup__under___item}>
            <div className={styles.mainServices_firstGroup__under___item____top}>
                <IonIcon name={iconName} className={styles.mainServices_firstGroup__under___item____top_____icon} />
                <GreenBlock className={styles.mainServices_firstGroup__under___item____top_____greenBlock} />
            </div>
            <span className={styles.mainServices_firstGroup__under___item____title}>
                { title }
            </span>
            <Information appendedClassName={styles.mainServices_firstGroup__under___item_information}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt .
            </Information>
        </div>
    )
}

export default MainServicesFirstGroupUnderItem;