import { FunctionComponent } from "react";
import styles from "../globalStyles/ItemOfGroupTitle.module.scss";

interface ItemOfGroupTitleProps {
    children: JSX.Element | string;
    appendedClassName: string;
}

const ItemOfGroupTitle: FunctionComponent<ItemOfGroupTitleProps> = ({ children, appendedClassName }) => {
    return(
        <span className={`${styles.itemOfGroup_title} ${appendedClassName}`}>
            { children }
        </span>
    )
}

// "itemOfGroup_title " + "itemOfGroup_title_" + id

export default ItemOfGroupTitle;