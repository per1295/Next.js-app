import ItemOfGroup from "../../globalComponents/ItemOfGroup";
import styles from "../../styles/home/TheMainFirstGroupBodyLeft.module.scss";
import imgStyles from "../../styles/home/LeftItemOfGroupImg.module.scss";

import inf_icon from "../../../public/home/inf_icon.png";
import arrows_icon from "../../../public/home/arrows_icon.png";
import shop_icon from "../../../public/home/shop_icon.png";
import range_icon from "../../../public/home/range_icon.png";

export default function TheMainFirstGroupBodyLeft() {
    const arrayOfSrc = [ inf_icon, arrows_icon, shop_icon, range_icon ];
    const arrayOfTitles = [ "unlimited options", "DESIGN & DEVELOPMENT", "e-commerce", "CUSTOMIZABLE DESIGN" ];
    const arrayColumnOfInfItems = [
        [
            "Branding",
            "Design & Copywriting",
            "Concept development",
            "User Experience"
        ],
        [
            "Information architecture",
            "Interface design",
            "Product Design",
            "Integrated ad Companies",
        ],
        [
            "Prototyping",
            "Technical Consulting",
            "Web applications",
            "Quality testing"
        ],
        [
            "Information architecture",
            "Interface design",
            "Product Design",
            "Integrated ad Companies"
        ]
    ];

    return(
        <div className={styles.main_firstGroup__body___left}>
            {arrayOfSrc.map((item, index) => (
                <ItemOfGroup
                key={index}
                id={`${index}`}
                srcOfImage={item} 
                columnOfInfItems={arrayColumnOfInfItems[index]}
                classNameIcon={imgStyles[`itemOfGroup_icon_${index}`]}
                classNameTitle={imgStyles[`itemOfGroup_title_${index}`]} >
                    { arrayOfTitles[index] }
                </ItemOfGroup>
            ))}
        </div>
    )
}