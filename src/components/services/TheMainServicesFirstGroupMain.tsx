import styles from "../../styles/services/TheMainServicesFirstGroupMain.module.scss";
import TheMainServicesFirstGroupMainLeft from "./TheMainServicesFirstGroupMainLeft";
import Image from "next/image";

import mainServices_image from "../../../public/services/mainServices_image.png";

export default function TheMainServicesFirstGroupMain() {
    return(
        <div className={styles.mainServices_firstGroup__main}>
            <TheMainServicesFirstGroupMainLeft/>
            <Image
            src={mainServices_image}
            alt="mainServices_image"
            className={styles.mainServices_firstGroup__image}
            placeholder="blur"/>
        </div>
    )
}