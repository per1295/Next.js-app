import styles from "../../styles/about us/TheMainAboutUsThirdGroupBottom.module.scss";
import TheWrapSlider from "./TheWrapSlider";
import TheMainAboutUsThirdGroupBottomImages from "./TheMainAboutUsThirdGroupBottomImages";

export default function TheMainAboutUsThirdGroupBottom() {
    return(
        <div className={styles.mainAboutUs_thirdGroup__bottom}>
            <TheWrapSlider/>
            <TheMainAboutUsThirdGroupBottomImages/>
        </div>
    )
}