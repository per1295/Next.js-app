import styles from "../../styles/home/TheHeaderCenter.module.scss";
import greenBlockStyles from "../../styles/home/TheHeaderCenterGreenBlock.module.scss";
import informationStyles from "../../styles/home/TheHeaderCenterInformation.module.scss";

import GreenBlock from "../../globalComponents/GreenBlock";
import TheHeaderCenterTitle from "./TheHeaderCenterTitle";
import Information from "../../globalComponents/Information";

export default function TheHeaderCenter() {
    return(
        <div className={styles.header_center}>
            <GreenBlock className={greenBlockStyles.header_center__greenBlock}>
                we’re
            </GreenBlock>
            <TheHeaderCenterTitle/>
            <Information appendedClassName={informationStyles.header_center_information}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Information>
        </div>
    )
}