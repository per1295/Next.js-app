import { FunctionComponent } from "react";
import ItemOfGroupTitle from "./ItemOfGroupTitle";
import ItemOfGroupInf from "./ItemOfGroupInf";
import styles from "../globalStyles/ItemOfGroup.module.scss";
import Image, { StaticImageData } from "next/image";

interface ItemOfGroupProps {
    id: string;
    srcOfImage: StaticImageData;
    children: JSX.Element | string;
    columnOfInfItems: string[];
    classNameIcon: string;
    classNameTitle: string;
}

const ItemOfGroup: FunctionComponent<ItemOfGroupProps> = ({ id, srcOfImage, children, columnOfInfItems, classNameTitle, classNameIcon }) => {
    return(
        <div className={styles.itemOfGroup}>
            <Image src={srcOfImage} alt="itemOfGroup_img" className={`itemOfGroup_icon ${classNameIcon}`}/>
            <ItemOfGroupTitle appendedClassName={classNameTitle}>
                { children }
            </ItemOfGroupTitle>
            <ItemOfGroupInf id={id} appendedClassName="firstGroup_body__left___itemOfGroup" columnOfInfItems={columnOfInfItems}/>
        </div>
    )
}

export default ItemOfGroup;