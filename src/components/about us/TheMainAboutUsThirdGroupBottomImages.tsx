import { useMemo } from "react";
import styles from "../../styles/about us/TheMainAboutUsThirdGroupBottomImages.module.scss";
import BottomImagesImage from "./BottomImagesImage";

import bottomImage_1 from "../../../public/about us/bottomImage_1.png";
import bottomImage_2 from "../../../public/about us/bottomImage_2.png";
import bottomImage_3 from "../../../public/about us/bottomImage_3.png";
import bottomImage_4 from "../../../public/about us/bottomImage_4.png";
import bottomImage_5 from "../../../public/about us/bottomImage_5.png";
import bottomImage_6 from "../../../public/about us/bottomImage_6.png";

export default function TheMainAboutUsThirdGroupBottomImages() {
    const bottomImages = useMemo(() => [
        bottomImage_1,
        bottomImage_2,
        bottomImage_3,
        bottomImage_4,
        bottomImage_5,
        bottomImage_6
    ], []);

    return(
        <div className={styles.mainAboutUs_thirdGroup__bottom___images}>
            {
                bottomImages.map((item, index) => (
                    <BottomImagesImage key={index} img={item} alt={`bottomImage_${index}`}/>
                ))
            }
        </div>
    )
}