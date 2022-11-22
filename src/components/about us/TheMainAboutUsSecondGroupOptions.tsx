import styles from "../../styles/about us/TheMainAboutUsSecondGroupOptions.module.scss"
import MainAboutUsSecondGroupOptionsItem from "./MainAboutUsSecondGroupOptionsItem";
import IconList from "@reacticons/ionicons/lib/components/iconList.json";

export default function TheMainAboutUsSecondGroupOptions() {
    const titles = [ "FULLY RESPONSIVE", "UNLIMITED OPTIONS", "WORDPRESS", "e-commerce", "CUSTOMIZABLE DESIGN", "SUPPORT" ];
    const iconNames = [
        "phone-portrait-outline",
        "infinite-outline",
        "logo-wordpress",
        "cart-outline",
        "options-outline",
        "hammer-outline"
    ] as (keyof typeof IconList)[];

    return(
        <div className={styles.mainAboutUs_secondGroup__options}>
            { iconNames.map((item, index) => (
                <MainAboutUsSecondGroupOptionsItem key={index} iconName={item} title={titles[index]}/>
            )) }
        </div>
    )
}