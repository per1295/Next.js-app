import styles from "../globalStyles/TheFooterConteinerHrefs.module.scss";
import Link from "next/link";

const TheFooterConteinerHrefs = () => {
    const hrefs = [ "Home", "-", "about us", "-", "services", "-", "blog", "-", "contact us" ];

    return(
        <div className={styles.footer_conteiner__hrefs}>
            { hrefs.map((item, index) => (
                item === "-"
                ?
                <span key={index} className={styles.footer_conteiner__hrefs___dash}>
                    { item }
                </span>
                :
                <Link key={index} href={`/${item.split(" ")[0].toLowerCase()}`} className={styles.footer_conteiner__hrefs___href}>
                    { item }
                </Link>
            )) }
        </div>
    )
}

export default TheFooterConteinerHrefs;