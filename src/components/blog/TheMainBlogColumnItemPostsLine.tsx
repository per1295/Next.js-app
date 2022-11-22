import { FunctionComponent, useEffect, useRef } from "react";
import { CategoryType } from "./TheMainBlogColumnItemPosts";
import styles from "../../styles/blog/TheMainBlogColumnItemPostsLine.module.scss";

interface TheMainBlogColumnItemPostsLineProps {
    category: CategoryType;
}

const TheMainBlogColumnItemPostsLine: FunctionComponent<TheMainBlogColumnItemPostsLineProps> = ({ category }) => {
    const greenLineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const greenLine = greenLineRef.current as HTMLDivElement;
        switch(category) {
            case "latest":
                greenLine.style.transform = "translateX(0)";
                break;
            case "popular":
                greenLine.style.transform = "translateX(100%)";
                break;
            case "comments":
                greenLine.style.transform = "translateX(204%)";
                break;
        } 
    }, [ category ]);

    return(
        <div className={styles.mainBlog_column__item___posts____line}>
            <div ref={greenLineRef} className={styles.mainBlog_column__item___posts____line_____greenLine}></div>
        </div>
    )
}

export default TheMainBlogColumnItemPostsLine;