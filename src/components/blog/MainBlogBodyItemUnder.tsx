import styles from "../../styles/blog/MainBlogBodyItemUnder.module.scss";
import MainBlogBodyItemUnderDate from "./MainBlogBodyItemUnderDate";
import MainBlogBodyItemUnderComments from "./MainBlogBodyItemUnderComments";
import MainBlogBodyItemUnderLikes from "./MainBlogBodyItemUnderLikes";

export default function MainBlogBodyItemUnder() {
    return(
        <div className={styles.mainBlog_body__item___under}>
            <MainBlogBodyItemUnderDate/>
            <MainBlogBodyItemUnderComments/>
            <MainBlogBodyItemUnderLikes/>
        </div>
    )
}