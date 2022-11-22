import { MouseEventHandler, useEffect, useRef } from "react";
import { useBlogData, useIdOfBlog, useNowUser } from "../../lib/customHooks";
import IonIcon from "@reacticons/ionicons";
import axios from "axios";
import styles from "../../styles/blog/MainBlogBodyItemUnderLikes.module.scss";
import { Response } from "../../lib/functions";

export default function MainBlogBodyItemUnderLikes() {
    const id = useIdOfBlog();
    const { blogData, setBlogData } = useBlogData(id);
    const { countLikes, usersWhoLiked } = blogData;
    const userData = useNowUser();
    const likeRef = useRef<HTMLDivElement>(null);

    const patchLikes = async () => {
        if ( !id ) return;
        await axios.patch<Response>(`/blog/blogs?id=${id}&typeUpdate=likes`, { countLikes, usersWhoLiked });
    };

    useEffect(() => {
        patchLikes();
    }, [ countLikes, usersWhoLiked ]);

    useEffect(() => {
        const like = likeRef.current as HTMLDivElement;
        const likeIcon = like.children[0] as HTMLElement; 
        if ( !likeIcon ) return;
        if ( !userData ) return;
        const { email } = userData;
        const isNowUserLiked = usersWhoLiked.some(user => user.email === email);
        if ( isNowUserLiked ) likeIcon.classList.add(styles.mainBlog_body__item___under____likes_____likeActive);
        else likeIcon.classList.remove(styles.mainBlog_body__item___under____likes_____likeActive);
    }, [ usersWhoLiked ]);

    const setLike: MouseEventHandler<HTMLDivElement> = () => {
        if ( !userData ) return alert("Please register in contacts")
        const { id, email, isVerified } = userData;
        if ( !isVerified ) return alert("Please verify your email");
        
        const isUserLiked = usersWhoLiked.find(user => user.email === email);
        if ( isUserLiked ) {
            const restUsersWhoLiked = usersWhoLiked.filter(user => user.email !== email);
            setBlogData({
                ...blogData,
                usersWhoLiked: restUsersWhoLiked,
                countLikes: countLikes - 1
            });
        } else {
            const newUser = {
                id,
                email,
                isVerified
            };
            setBlogData({
                ...blogData,
                usersWhoLiked: [ ...usersWhoLiked, newUser ],
                countLikes: countLikes + 1
            });
        }
    }

    return(
        <div ref={likeRef} className={styles.mainBlog_body__item___under____likes} onClick={setLike}>
            <IonIcon
            name="heart"
            className={
                `${styles.mainBlog_body__item___under____likes_____like} mainBlog_body__item___under____likes_____like${id}`
            }/>
            <span className={styles.mainBlog_body__item___under____likes_____countLikes}>
                { countLikes }
            </span>
        </div>
    )
}