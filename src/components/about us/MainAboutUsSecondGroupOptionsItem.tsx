import { FunctionComponent } from "react";
import Information from "../../globalComponents/Information";
import styles from "../../styles/about us/MainAboutUsSecondGroupOptionsItem.module.scss";
import OptionsItemHead from "./OptionsItemHead";
import IconList from "@reacticons/ionicons/lib/components/iconList.json";

interface MainAboutUsSecondGroupOptionsItemProps {
    iconName: keyof typeof IconList;
    title: string;
}

const MainAboutUsSecondGroupOptionsItem: FunctionComponent<MainAboutUsSecondGroupOptionsItemProps> = ({ iconName, title }) => {
    return(
        <div className={styles.mainAboutUs_secondGroup__options___item}>
            <OptionsItemHead iconName={iconName} title={title}/>
            <Information appendedClassName={styles.mainAboutUs_secondGroup__options___item_information}>
                Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In eleifend suscipit enim, eu commodo neque molestie vitae.
            </Information>
        </div>
    )
}

export default MainAboutUsSecondGroupOptionsItem;