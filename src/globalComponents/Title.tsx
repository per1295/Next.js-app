import { FunctionComponent } from "react";
import GreenBlock from "./GreenBlock";
import styles from "../globalStyles/Title.module.scss";

interface TitleProps {
    appendedClassNameTitle?: string;
    appendedClassNameTitleName?: string;
    appendedClassNameTitleGreenBlock?: string;
    children: JSX.Element | string;
}

const Title: FunctionComponent<TitleProps> = ({
    children, appendedClassNameTitle, appendedClassNameTitleName, appendedClassNameTitleGreenBlock
}) => {
    return(
        <div className={`${styles.title} ${appendedClassNameTitle}`}>
            <span className={`${styles.title_name} ${appendedClassNameTitleName}`}>
                { children }
            </span>
            <GreenBlock className={`${styles.title_greenBlock} ${appendedClassNameTitleGreenBlock}`}/>
        </div>
    )
}

// "title " + appendedClassName + "_title"
// "title_name " + appendedClassName + "_title_name"
// "title_greenBlock " + appendedClassName + "_title_greenBlock"

export default Title;