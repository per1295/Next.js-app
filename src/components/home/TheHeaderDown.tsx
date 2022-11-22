import styles from "../../styles/home/TheHeaderDown.module.scss";
import TheHeaderDownRight from "./TheHeaderDownRight";
import Image from "next/image";

import header_down from "../../../public/home/header_down__img.png";

export default function TheHeaderDown() {
    return(
        <div className={styles.header_down}>
            <Image src={header_down} alt="header_down__img" className={styles.header_down__img} placeholder="blur"/>
            <TheHeaderDownRight/>
        </div>
    )
}