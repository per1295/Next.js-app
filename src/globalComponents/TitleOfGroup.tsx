import { FunctionComponent } from "react";
import Title from "./Title";
import Information from "./Information";
import styles from "../globalStyles/TitleOfGroup.module.scss";

interface TitleOfGroupProps {
    appendedClassName?: string;
    appendedClassNameInformation?: string;
    appendedClassNameTitle?: string;
    appendedClassNameTitleName?: string;
    appendedClassNameTitleGreenBlock?: string;
    children: JSX.Element | string;
}

const TitleOfGroup: FunctionComponent<TitleOfGroupProps> = ({
    appendedClassNameTitle, appendedClassNameTitleName, appendedClassNameTitleGreenBlock, children,
    appendedClassName, appendedClassNameInformation
}) => {
    return(
        <div className={`${styles.titleOfGroup} ${appendedClassName}`}>
            <Title
            appendedClassNameTitle={appendedClassNameTitle}
            appendedClassNameTitleName={appendedClassNameTitleName}
            appendedClassNameTitleGreenBlock={appendedClassNameTitleGreenBlock} >
                { children }
            </Title>
            <Information appendedClassName={`${styles.information} ${appendedClassNameInformation}`}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Information>
        </div>
    )
}

// "titleOfGroup " + appendedClassName + "_titleOfGroup"
// `${appendedClassName}_titleOfGroup
// `${appendedClassName}_titleOfGroup`

export default TitleOfGroup;