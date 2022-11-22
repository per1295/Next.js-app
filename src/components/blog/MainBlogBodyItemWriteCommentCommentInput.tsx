import styles from "../../styles/blog/MainBlogBodyItemWriteCommentCommentInput.module.scss";

export default function MainBlogBodyItemWriteCommentCommentInput() {
    return(
        <input
        type="text"
        name="comment"
        className={styles.mainBlog_body__item___writeComment____commentInput}/>
    )
}