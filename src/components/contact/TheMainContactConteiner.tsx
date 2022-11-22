import styles from "../../styles/contact/TheMainContactConteiner.module.scss";
import TheMainContactConteinerLeft from "./TheMainContactConteinerLeft";
import Image from "next/image";

import mainContact_map from "../../../public/contact/mainContact_map.png";

export default function TheMainContactConteiner() {
    return(
        <div className={styles.mainContact_conteiner}>
            <TheMainContactConteinerLeft/>
            <Image
            src={mainContact_map}
            alt="mainContact_map"
            className={styles.mainContact_conteiner__img}
            placeholder="blur" />
        </div>
    )
}