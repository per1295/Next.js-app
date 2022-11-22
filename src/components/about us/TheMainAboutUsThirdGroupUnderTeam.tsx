import styles from "../../styles/about us/TheMainAboutUsThirdGroupUnderTeam.module.scss";
import TheMainAboutUsThirdGroupUnderTeamText from "./TheMainAboutUsThirdGroupUnderTeamText";
import Button from "../../globalComponents/Button";
import { useRouter } from "next/router";

export default function TheMainAboutUsThirdGroupUnderTeam() {
    const router = useRouter();

    const toServices = () => router.push("/services");

    return(
        <div className={styles.mainAboutUs_thirdGroup__underTeam}>
            <TheMainAboutUsThirdGroupUnderTeamText/>
            <Button onClick={toServices} startColor="green" className={styles.mainAboutUs_thirdGroup__underTeam___button}>
                read more
            </Button>
        </div>
    )
}