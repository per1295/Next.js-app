import { useBlogData, useIdOfBlog } from "../../lib/customHooks";
import styles from "../../styles/blog/MainBlogBodyItemDescription.module.scss";

export default function MainBlogBodyItemDescription() {
    const id = useIdOfBlog();
    const { blogData } = useBlogData(id);
    const { description } = blogData;

    return(
        <span className={styles.mainBlog_body__item___description}>
            { description }
        </span>
    )
}