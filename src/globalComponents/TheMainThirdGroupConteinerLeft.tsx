import styles from "../globalStyles/TheMainThirdGroupConteinerLeft.module.scss"
import Button from "./Button";
import { useRouter } from "next/router";

export default function TheMainThirdGroupConteinerLeft() {
    const router = useRouter();

    const toContactUs = () => router.push("/contact");

    return(
        <div className={styles.main_thirdGroup__conteiner___left}>
            <span className={styles.main_thirdGroup__conteiner___left____title}>
                YOU THINK WE'RE COOL ? LET'S WORK TOGETHER
            </span>
            <Button onClick={toContactUs} startColor="white" className={styles.main_thirdGroup__conteiner___left____button}>
                get in touch
            </Button>
        </div>
    )
}