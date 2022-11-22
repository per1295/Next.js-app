import { FunctionComponent, useMemo } from "react";
import styles from "../globalStyles/ItemOfGroupInf.module.scss";

interface ItemOfGroupInfProps {
    columnOfInfItems: string[];
    appendedClassName?: string;
    id: string;
}

const ItemOfGroupInf: FunctionComponent<ItemOfGroupInfProps> = ({ columnOfInfItems, appendedClassName, id }) => {
    const memoizedColumOfInfItems = useMemo(() => (
        columnOfInfItems.map(( item, index ) => (
            <li key={index} className="itemOfGroup_inf__item">
                { item }
            </li>
        ))
    ), [ columnOfInfItems ]);

    return(
        <ul className={`itemOfGroup_inf_${id} ${styles.itemOfGroup_inf} ${appendedClassName}`}>
            { memoizedColumOfInfItems }
        </ul>
    )
}

// `itemOfGroup_inf_${id} ` + "itemOfGroup_inf " + appendedClassName + "_itemOfGroup__inf"

export default ItemOfGroupInf;