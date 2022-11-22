import { useEffect, useRef } from "react";
import styles from "../../styles/blog/MainBlogBodyItemWriteComment.module.scss";
import MainBlogBodyItemWriteCommentCommentInput from "./MainBlogBodyItemWriteCommentCommentInput";
import IonIcon from "@reacticons/ionicons";
import { useCommentVisible, useNowUser, useBlogData, useIdOfBlog } from "../../lib/customHooks";
import axios from "axios";
import { Response } from "../../lib/functions";

export default function MainBlogBodyItemWriteComment() {
    const { isCommentVisible } = useCommentVisible();
    const writeCommentRef = useRef<HTMLDivElement>(null);
    const nowUser = useNowUser();
    const id = useIdOfBlog();
    const { blogData, setBlogData } = useBlogData(id);
    const { comments, countComments } = blogData;

    const patchComments = async () => {
        if ( !id ) return;
        await axios.patch<Response>(`/blog/blogs?id=${id}&typeUpdate=comments`, { comments, countComments });
    };

    useEffect(() => {
        patchComments();
    }, [ comments, countComments ]);

    const writeCommentDisappear = ( event: TransitionEvent ) => {
        const writeComment = event.currentTarget as HTMLDivElement;
        writeComment.classList.remove(styles.mainBlog_body__item___writeCommentVisible);
    } 

    useEffect(() => {
        const writeComment = writeCommentRef.current as HTMLDivElement;
        if ( isCommentVisible ) {
            writeComment.removeEventListener("transitionend", writeCommentDisappear);
            writeComment.classList.add(styles.mainBlog_body__item___writeCommentVisible);
            setTimeout(() => writeComment.classList.add(styles.mainBlog_body__item___writeCommentActive));
        } else {
            writeComment.addEventListener("transitionend", writeCommentDisappear);
            writeComment.classList.remove(styles.mainBlog_body__item___writeCommentActive);
        }

        return () => {
            writeComment.removeEventListener("transitionend", writeCommentDisappear);
        }
    }, [ isCommentVisible ]);

    const ckickIcon = async () => {
        if ( !nowUser ) return;
        const writeComment = writeCommentRef.current as HTMLDivElement;
        const inputComment = writeComment.children[0] as HTMLInputElement;
        const comment = inputComment.value;
        const { email } = nowUser;
        const newComment = { email, comment };
        setBlogData({
            ...blogData,
            countComments: countComments + 1,
            comments: [ newComment, ...comments ]
        });
        inputComment.value = "";
    }

    return(
        <div ref={writeCommentRef} className={styles.mainBlog_body__item___writeComment}>
            <MainBlogBodyItemWriteCommentCommentInput/>
            <IonIcon
            name="arrow-forward-circle-outline"
            className={styles.mainBlog_body__item___writeComment____submit}
            onClick={ckickIcon}/>
        </div>
    )
}