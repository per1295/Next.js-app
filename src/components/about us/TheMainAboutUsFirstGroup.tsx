import styles from "../../styles/about us/TheMainAboutUsFirstGroup.module.scss";
import MainAboutUsFirstGroupItem from "./MainAboutUsFirstGroupItem";

export default function TheMainAboutUsFirstGroup() {
    return(
        <div className={styles.mainAboutUs_firstGroup}>
            <MainAboutUsFirstGroupItem title="about us" underTitle="We are awesome"/>
            <MainAboutUsFirstGroupItem title="What We Do" underTitle="Creative & Digital"/>
        </div>
    )
}