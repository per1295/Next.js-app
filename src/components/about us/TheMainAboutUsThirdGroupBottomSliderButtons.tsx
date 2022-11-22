import styles from "../../styles/about us/TheMainAboutUsThirdGroupBottomSliderButtons.module.scss";
import BottomSliderButtonsButton from "./BottomSliderButtonsButton";

export default function TheMainAboutUsThirdGroupBottomSliderButtons() {
    return(
        <div className={styles.mainAboutUs_thirdGroup__bottom___sliderButtons}>
            {
                Array.from({ length: 4 }).map((_item, index) => (
                    <BottomSliderButtonsButton key={index} activeSlide={index}/>
                ))
            }
        </div>
    )
}