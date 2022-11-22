import { FunctionComponent } from "react";
import styles from "../../styles/about us/MainAboutUsFirstGroupItemUnderTitle.module.scss"

interface MainAboutUsFirstGroupItemUnderTitleProps {
    children: string | JSX.Element;
}

const MainAboutUsFirstGroupItemUnderTitle: FunctionComponent<MainAboutUsFirstGroupItemUnderTitleProps> = ({ children }) => {
    return(
        <span className={styles.mainAboutUs_firstGroup__item___underTitle}>
            { children }
        </span>
    )
}

export default MainAboutUsFirstGroupItemUnderTitle;