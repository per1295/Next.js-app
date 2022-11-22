import Information from "../../globalComponents/Information";
import TheFooterConteinerIcons from "../../globalComponents/TheFooterConteinerIcons";
import styles from "../../styles/contact/TheMainContactConteinerLeftInfo.module.scss";

export default function TheMainContactConteinerLeftInfo() {
    const arrData = [
        "13D, Functional apartment, Unique colony,",
        "Agadir 86360",
        "+212 124-566-780", 
        "+212 124-566-780",
        "email@website.com"
    ];

    return(
        <div className={styles.mainContact_conteiner__left___info}>
            <span className={styles.mainContact_conteiner__left___info____title}>
                CONTACT INFO
            </span>
            <Information appendedClassName={styles.mainContact_conteiner__left___info_information}>
                Lorem ipsum dolor sit amet, conse adipisicing elit. Libero incidunt quod ab mollitia quia dolorum conse.
            </Information>
            <div className={styles.mainContact_conteiner__left___info____data}>
                {
                    arrData.map((item, index) => (
                        <Information key={index} appendedClassName={styles.mainContact_conteiner__left___info____data_information}>
                            { item }
                        </Information>
                    ))
                }
            </div>
            <TheFooterConteinerIcons/>
        </div>
    )
}