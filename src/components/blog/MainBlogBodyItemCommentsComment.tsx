import { FunctionComponent, useEffect, useRef } from "react";
import styles from "../../styles/blog/MainBlogBodyItemCommentsComment.module.scss";

interface MainBlogBodyItemCommentsCommentProps {
    email: string;
    comment: string;
    timeoutMs: number;
}

const MainBlogBodyItemCommentsComment: FunctionComponent<MainBlogBodyItemCommentsCommentProps> = ({
    email, comment, timeoutMs
}) =>
{
    const commentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const comment = commentRef.current as HTMLDivElement;
        const timeout = setTimeout(() => {
            comment.classList.add(styles.mainBlog_body__item___comments____commentActive);
        }, timeoutMs);

        return () => {
            clearTimeout(timeout);
        }
    }, []);

    return(
        <div ref={commentRef} className={styles.mainBlog_body__item___comments____comment}>
            <span className={styles.mainBlog_body__item___comments____comment_____email}>
                Email: { email }
            </span>
            <span className={styles.mainBlog_body__item___comments____comment_____comment}>
                Comment: { comment }
            </span>
        </div>
    )
}

export default MainBlogBodyItemCommentsComment;