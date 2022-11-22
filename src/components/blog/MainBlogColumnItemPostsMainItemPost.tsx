import { FunctionComponent } from "react";
import styles from "../../styles/blog/MainBlogColumnItemPostsMainItemPost.module.scss";
import { PostData } from "./MainBlogColumnItemPostsMainItem";
import Image from "next/image";
import { useLoading } from "../../lib/customHooks";

interface MainBlogColumnItemPostsMainItemPostProps {
    postData: PostData;
}

const MainBlogColumnItemPostsMainItemPost: FunctionComponent<MainBlogColumnItemPostsMainItemPostProps> = ({ postData }) => {
    const { title, dateCreation, img, id } = postData;

    const onLoadShow = (
        <>
            <span className={styles.item_post__data___title}>
                { title }
            </span>
            <span className={styles.item_post__data___dateCreation}>
                { dateCreation }
            </span>
        </>
    );

    const loading = useLoading(typeof id !== "object", onLoadShow);

    const blurDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk4G6oBwABqgEM71k0xwAAAABJRU5ErkJggg==";

    return(
        <div className={styles.item_post}>
            <Image
            src={img || blurDataURL}
            alt="columnPost_img"
            height={81}
            width={81}
            className={styles.item_post__img}
            placeholder="blur"
            blurDataURL={blurDataURL} />
            <div className={styles.item_post__data}>
                { loading }
            </div>
        </div>
    )
}

export default MainBlogColumnItemPostsMainItemPost;