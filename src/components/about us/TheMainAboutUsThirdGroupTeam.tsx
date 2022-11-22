import { useMemo } from "react";
import styles from "../../styles/about us/TheMainAboutUsThirdGroupTeam.module.scss";
import MainAboutUsThirdGroupTeamItem from "./MainAboutUsThirdGroupTeamItem";

import teamItem_1 from "../../../public/about us/teamItem_1.png";
import teamItem_2 from "../../../public/about us/teamItem_2.png";
import teamItem_3 from "../../../public/about us/teamItem_3.png";
import teamItem_4 from "../../../public/about us/teamItem_4.png";
import teamItem_5 from "../../../public/about us/teamItem_5.png";
import teamItem_6 from "../../../public/about us/teamItem_6.png";
import teamItem_7 from "../../../public/about us/teamItem_7.png";
import teamItem_8 from "../../../public/about us/teamItem_8.png";

export default function TheMainAboutUsThirdGroupTeam() {
    const teamItems = useMemo(() => [
        teamItem_1, teamItem_2, teamItem_3, teamItem_4,
        teamItem_5, teamItem_6, teamItem_7, teamItem_8
    ], []);

    return(
        <div className={styles.mainAboutUs_thirdGroup__team}>
            {
                teamItems.map((item, index) => (
                    <MainAboutUsThirdGroupTeamItem key={index} img={item} alt={`teamItem_${index}`} index={`${index}`}/>
                ))
            }
        </div>
    )
}