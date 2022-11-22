import { FunctionComponent } from "react";
import styles from "../globalStyles/Information.module.scss";

interface InformationProps {
    children: JSX.Element | string;
    appendedClassName?: string;
}

const Information: FunctionComponent<InformationProps> = ({ children, appendedClassName }) => {
    return(
        <div className={`${styles.information} ${appendedClassName}`}>
            { children }
        </div>
    )
}

// "information " + appendedClassName + "_information"

export default Information;