import { FunctionComponent } from "react";
import Title from "../../globalComponents/Title";
import styles from  "../../styles/about us/MainAboutUsFirstGroupItem.module.scss";
import MainAboutUsFirstGroupItemUnderTitle from "./MainAboutUsFirstGroupItemUnderTitle";
import Information from "../../globalComponents/Information";

interface MainAboutUsFirstGroupItemProps {
    title: string;
    underTitle: string;
}

const MainAboutUsFirstGroupItem: FunctionComponent<MainAboutUsFirstGroupItemProps> = ({ title, underTitle }) => {
    return(
        <div className={styles.mainAboutUs_firstGroup__item}>
            <Title
            appendedClassNameTitleGreenBlock={styles.mainAboutUs_firstGroup__item_title_greenBlock}
            appendedClassNameTitleName={styles.mainAboutUs_firstGroup__item_title_name}
            >
                { title }
            </Title>
            <MainAboutUsFirstGroupItemUnderTitle>
                { underTitle }
            </MainAboutUsFirstGroupItemUnderTitle>
            <Information appendedClassName={styles.mainAboutUs_firstGroup__item_information}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
            </Information>
        </div>
    )
}

export default MainAboutUsFirstGroupItem;