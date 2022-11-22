import { FunctionComponent } from "react";
import styles from "../../styles/services/MainServicesFirstGroupMainLeftCheckboxes.module.scss";
import CheckboxLine from "./CheckboxLine";

interface TheMainServicesFirstGroupMainLeftCheckboxesProps {
    titles: string[];
}

const TheMainServicesFirstGroupMainLeftCheckboxes: FunctionComponent<TheMainServicesFirstGroupMainLeftCheckboxesProps> = ({ titles }) => {

    return(
        <div className={styles.mainServices_firstGroup__main___left____checkboxes}>
            {
                titles.map((item, index) => (
                    <CheckboxLine key={index}>
                        { item }
                    </CheckboxLine>
                ))
            }
        </div>
    )
}

export default TheMainServicesFirstGroupMainLeftCheckboxes;