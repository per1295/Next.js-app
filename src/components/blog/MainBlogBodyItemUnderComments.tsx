import { MouseEventHandler } from "react";
import { useBlogData, useIdOfBlog, useNowUser } from "../../lib/customHooks";
import IonIcon from "@reacticons/ionicons";
import styles from "../../styles/blog/MainBlogBodyItemUnderComments.module.scss";
import { useCommentVisible } from "../../lib/customHooks";

export default function MainBlogBodyItemUnderComments() {
    const id = useIdOfBlog();
    const { blogData } = useBlogData(id);
    const { countComments } = blogData;
    const userData = useNowUser();
    const { isCommentVisible, setIsCommentVisible } = useCommentVisible();

    const clickComment: MouseEventHandler<HTMLDivElement> = () => {
        if ( !userData ) return alert("Please register in contacts")
        const { isVerified } = userData;
        if ( !isVerified ) return alert("Please verify your email");
        setIsCommentVisible(!isCommentVisible);
    }

    return(
        <div className={styles.mainBlog_body__item___under____comments} onClick={clickComment}>
            <IonIcon name="chatbox-ellipses" className={styles.mainBlog_body__item___under____comments_____comment}/>
            <span className={styles.mainBlog_body__item___under____comments_____countComments}>
                { countComments }
            </span>
        </div>
    )
}