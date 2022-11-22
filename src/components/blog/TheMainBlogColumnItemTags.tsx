import React from "react";
import styles from "../../styles/blog/TheMainBlogColumnItemTags.module.scss";
import MainBlogColumnItemTagsTag from "./MainBlogColumnItemTagsTag";

export default function TheMainBlogColumnItemTags() {
    const tags = [
        "Css",
        "Javascript",
        "Jquery",
        "Html5",
        "Bootstrap",
        "Gap",
        "Css",
        "Javascript",
        "Jquery"
    ];

    return(
        <div className={styles.mainBlog_column__item___tags}>
            {
                tags.map((item, index) => (
                    item === "Gap"
                    ?
                    <div key={index} className={styles[`mainBlog_column__item___tags____tag${item}`]}></div>
                    :
                    <MainBlogColumnItemTagsTag key={index}>
                        { item }
                    </MainBlogColumnItemTagsTag>
                ))
            }
        </div>
    )
}