import { FunctionComponent, useState } from "react";
import styles from "../../styles/blog/MainBlogBodyItem.module.scss";
import MainBlogBodyItemUnder from "./MainBlogBodyItemUnder";
import MainBlogBodyItemTitle from "./MainBlogBodyItemTitle";
import MainBlogBodyItemDescription from "./MainBlogBodyItemDescription";
import MainBlogBodyItemReadMore from "./MainBlogBodyItemReadMore";
import MainBlogBodyItemWriteComment from "./MainBlogBodyItemWriteComment";
import MainBlogBodyItemComments from "./MainBlogBodyItemComments";
import { useBlogData, useLoading } from "../../lib/customHooks";
import { IdContext, CommentContext, CommentVisibleContext } from "../../lib/contexts";
import Image from "next/image";

interface IBlogItemsProps {
    id: number | null;
}

const MainBlogBodyItem: FunctionComponent<IBlogItemsProps> = ({
    id
}) => {
    const { blogData } = useBlogData(id);
    const { img } = blogData;
    const [ isReadMore, setIsReadMore ] = useState(false);

    const onLoadShow = (
        <>
            <MainBlogBodyItemUnder/>
            <MainBlogBodyItemWriteComment/>
            <MainBlogBodyItemTitle/>
            <MainBlogBodyItemDescription/>
            <MainBlogBodyItemReadMore isReadMore={isReadMore} setIsReadMore={setIsReadMore} />
        </>
    );

    const loading = useLoading(typeof id !== "object", onLoadShow);

    const [ comment, setComment ] = useState("");
    const commentContext = { comment, setComment };

    const [ isCommentVisible, setIsCommentVisible ] = useState(false);
    const commentVisibleContext = { isCommentVisible, setIsCommentVisible };

    const blurDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk4G6oBwABqgEM71k0xwAAAABJRU5ErkJggg==";

    return(
        <IdContext.Provider value={id}>
            <CommentContext.Provider value={commentContext}>
                <CommentVisibleContext.Provider value={commentVisibleContext}>
                    <div className={styles.mainBlog_body__item}>
                        <Image
                        src={img || blurDataURL}
                        alt="img_Blog"
                        width={750}
                        height={500}
                        className={styles.mainBlog_body__item___img}
                        placeholder="blur"
                        blurDataURL={blurDataURL} />
                        { loading }
                        { isReadMore ? <MainBlogBodyItemComments/> : null }
                    </div>
                </CommentVisibleContext.Provider>
            </CommentContext.Provider>
        </IdContext.Provider>
    )
}

export default MainBlogBodyItem