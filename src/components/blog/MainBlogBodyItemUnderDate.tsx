import { useBlogData, useIdOfBlog } from "../../lib/customHooks";
import styles from "../../styles/blog/MainBlogBodyItemUnderDate.module.scss";

export default function MainBlogBodyItemUnderDate() {
    const id = useIdOfBlog();
    const { blogData } = useBlogData(id);
    const { dateOfCreation } = blogData;

    return(
        <div className={styles.mainBlog_body__item___under____date}>
            { dateOfCreation }
        </div>
    )
}