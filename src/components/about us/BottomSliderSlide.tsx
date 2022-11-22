import styles from "../../styles/about us/BottomSliderSlide.module.scss";
import Information from "../../globalComponents/Information";
import Button from "../../globalComponents/Button";
import Image from "next/image";

import slideImage from "../../../public/about us/slideImage.png";

export default function BottomSliderSlide() {
    return(
        <div className={styles.bottom_slider__slide}>
            <Image
            src={slideImage}
            alt="slideImage"
            className={styles.bottom_slider__slide___img}
            placeholder="blur"
            />
            <Information appendedClassName={styles.bottom_slider__slide_information}>
                Quisque iaculis lorem vestibulum eros vehicula, non congue elit dictum. Donec mollis aliquet lorem, eu porttitor sapien semper in. Duis ac erat luctus, gravida lectus sit amet, consectetur orci. Suspendisse libero mauris.
            </Information>
            <Button startColor="green" className={styles.bottom_slider__slide___button}>
                john doe
            </Button>
        </div>
    )
}