import styles from "../../styles/home/TheHeaderDownRight.module.scss";
import Title from "../../globalComponents/Title";
import titleStyles from "../../styles/home/TheHeaderDownRightTitle.module.scss";
import Information from "../../globalComponents/Information";
import informationStyles from "../../styles/home/TheHeaderDownRightInformation.module.scss";
import Button from "../../globalComponents/Button";
import rightButtonStyles from "../../styles/home/TheHeaderDownRightButton.module.scss";
import { useRouter } from "next/router";

export default function TheHeaderDownRight() {
    const router = useRouter();

    const toAboutUs = () => router.push("/about us");

    return(
        <div className={styles.header_down__right}>
            <Title
            appendedClassNameTitleName={titleStyles.header_down__right_title_name}
            appendedClassNameTitleGreenBlock={titleStyles.header_down__right_title_greenBlock} >
                HISTORY OF AGENCY
            </Title>
            <Information appendedClassName={informationStyles.header_down_information}>
                Porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi modi tempora incidunt ut labore.
            </Information>
            <Button onClick={toAboutUs} startColor="green" className={rightButtonStyles.header_down__button}>
                read more
            </Button>
        </div>
    )
}