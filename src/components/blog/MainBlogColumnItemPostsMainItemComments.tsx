import { forwardRef } from "react";
import styles from "../../styles/blog/MainBlogColumnItemPostsMainItemComments.module.scss";

const MainBlogColumnItemPostsMainItemComments = forwardRef<HTMLDivElement>((_props, ref) => (
    <div ref={ref} className={styles.mainBlog_column__item___posts____main_____item______comments}>
        No comments...
    </div>
));

export default MainBlogColumnItemPostsMainItemComments;