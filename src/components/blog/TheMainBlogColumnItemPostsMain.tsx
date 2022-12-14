import { FunctionComponent } from "react";
import { CategoryType } from "./TheMainBlogColumnItemPosts";
import styles from "../../styles/blog/TheMainBlogColumnItemPostsMain.module.scss";
import MainBlogColumnItemPostsMainItem from "./MainBlogColumnItemPostsMainItem";

interface TheMainBlogColumnItemPostsMainProps {
    category: CategoryType;
}

const TheMainBlogColumnItemPostsMain: FunctionComponent<TheMainBlogColumnItemPostsMainProps> = ({ category }) => {
    return(
        <div className={styles.mainBlog_column__item___posts____main}>
            <MainBlogColumnItemPostsMainItem category={category} ownCategory="latest"/>
            <MainBlogColumnItemPostsMainItem category={category} ownCategory="popular"/>
            <MainBlogColumnItemPostsMainItem category={category} ownCategory="comments"/>
        </div>
    )
}

export default TheMainBlogColumnItemPostsMain;