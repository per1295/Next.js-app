import styles from "../globalStyles/TheFooterConteiner.module.scss";
import TheFooterConteinerHrefs from "./TheFooterConteinerHrefs";
import TheFooterConteinerCopyRight from "./TheFooterConteinerCopyRight";
import TheFooterConteinerIcons from "./TheFooterConteinerIcons";

export default function TheFooterConteiner() {
    return(
        <div className={styles.footer_conteiner}>
            <TheFooterConteinerHrefs/>
            <TheFooterConteinerCopyRight/>
            <TheFooterConteinerIcons/>
        </div>
    )
}