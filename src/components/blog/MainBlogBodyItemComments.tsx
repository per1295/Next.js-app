import { useBlogData, useIdOfBlog } from "../../lib/customHooks";
import styles from "../../styles/blog/MainBlogBodyItemComments.module.scss";
import MainBlogBodyItemCommentsComment from "./MainBlogBodyItemCommentsComment";
import MainBlogBodyItemCommentsNoComments from "./MainBlogBodyItemCommentsNoComments";

export default function MainBlogBodyItemComments() {
    const id = useIdOfBlog();
    const { blogData } = useBlogData(id);
    const { comments } = blogData;

    return(
        <div className={styles.mainBlog_body__item___comments}>
            {
                comments.length === 0
                ?
                <MainBlogBodyItemCommentsNoComments/>
                :
                comments.map((item, index) => (
                    <MainBlogBodyItemCommentsComment
                    key={index}
                    email={item.email}
                    comment={item.comment}
                    timeoutMs={index * 250}
                    />
                ))
            }
        </div>
    )
}