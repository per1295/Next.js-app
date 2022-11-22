import { PointerEventHandler, useEffect, useRef, FunctionComponent, Dispatch, SetStateAction, MouseEventHandler } from "react";
import IonIcon from "@reacticons/ionicons";
import styles from "../../styles/blog/MainBlogBodyItemReadMore.module.scss";
import { useTypedSelector } from "../../lib/customHooks";
import store from "../../redux/store";
import { setIsOnDocumentFalse } from "../../redux/slices/isOnDocument";

interface MainBlogBodyItemCommentsProps {
    isReadMore: boolean;
    setIsReadMore: Dispatch<SetStateAction<boolean>>;
}

const MainBlogBodyItemReadMore: FunctionComponent<MainBlogBodyItemCommentsProps> = ({ isReadMore, setIsReadMore }) => {
    const isMobile = useTypedSelector<"isMobile">(state => state.isMobile);
    const isTablet = useTypedSelector<"isTablet">(state => state.isTablet);
    const isOnDocument = useTypedSelector<"isOnDocument">(state => state.isOnDocument);
    const readMoreRef = useRef<HTMLDivElement>(null);

    const isMobileOrTablet = isMobile || isTablet;

    useEffect(() => {
        const readMore = readMoreRef.current as HTMLDivElement;
        if ( isReadMore ) setTimeout(() => readMore.remove(), 250);
    }, [ isReadMore ]);

    const pointerHandler = (typeEvent: string) => {
        const readMore = readMoreRef.current as HTMLDivElement;
        const arrow = readMore.children[1];

        switch(typeEvent) {
            case "pointerenter":
            case "click":
                arrow.classList.add(styles.mainBlog_body__item___readMore____arrowActive);
                break;
            case "pointerleave":
                arrow.classList.remove(styles.mainBlog_body__item___readMore____arrowActive);
                break;
        }
    }

    useEffect(() => {
        if ( isMobileOrTablet && isOnDocument ) pointerHandler("pointerleave");
    }, [ isOnDocument ]);

    const callPointerHandler: MouseEventHandler<HTMLDivElement> = (event) => pointerHandler(event.type);

    const pointerDown: PointerEventHandler<HTMLDivElement> = event => {
        event.stopPropagation();
        store.dispatch( setIsOnDocumentFalse() );
    }

    return(
        <div
        ref={readMoreRef}
        className={styles.mainBlog_body__item___readMore}
        onPointerDown={pointerDown}
        onPointerEnter={isMobileOrTablet ? undefined : callPointerHandler}
        onPointerLeave={isMobileOrTablet ? undefined : callPointerHandler}
        onClick={event => {
            if ( isMobile ) callPointerHandler(event);
            setIsReadMore(true);
        }}
        >
            <span className={styles.mainBlog_body__item___readMore____text}>
                continue reading
            </span>
            <IonIcon name="arrow-forward-outline" className={styles.mainBlog_body__item___readMore____arrow}/>
        </div>
    )
}

export default MainBlogBodyItemReadMore;