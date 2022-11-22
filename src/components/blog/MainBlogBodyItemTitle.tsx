import { useBlogData, useIdOfBlog } from "../../lib/customHooks";
import styles from "../../styles/blog/MainBlogBodyItemTitle.module.scss";

export default function MainBlogBodyItemTitle() {
    const id = useIdOfBlog();
    const { blogData } = useBlogData(id);
    const { title } = blogData;

    return(
        <span className={styles.mainBlog_body__item___title}>
            { title }
        </span>
    )
}