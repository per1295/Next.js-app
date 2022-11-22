import TheMainFirstGroupBodyLeft from "./TheMainFirstGroupBodyLeft";
import Image from "next/image";

import styles from "../../styles/home/TheMainFirstGroupBody.module.scss";
import rightImageStyles from "../../styles/home/TheMainFirstGroupBodyRightImg.module.scss";

import main_firstGroup__body___rightImg from "../../../public/home/main_firstGroup__body___rightImg.png";

export default function TheMainFirstGroupBody() {
    return(
        <div className={styles.main_firstGroup__body}>
            <TheMainFirstGroupBodyLeft/>
            <Image
            src={main_firstGroup__body___rightImg}
            alt="main_firstGroup__rightImg"
            className={rightImageStyles.main_firstGroup__body___rightImg}
            placeholder="blur" />
        </div>
    )
}