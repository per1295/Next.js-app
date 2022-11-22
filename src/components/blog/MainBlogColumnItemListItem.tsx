import { FunctionComponent, PointerEventHandler, useEffect, useRef } from "react";
import styles from "../../styles/blog/MainBlogColumnItemListItem.module.scss";
import { useTypedSelector } from "../../lib/customHooks";
import store from "../../redux/store";
import { setIsOnDocumentFalse } from "../../redux/slices/isOnDocument";

interface MainBlogColumnItemListItemProps {
    title: string;
    count: number;
}

const MainBlogColumnItemListItem: FunctionComponent<MainBlogColumnItemListItemProps> = ({ title, count }) => {
    const isMobile = useTypedSelector<"isMobile">(state => state.isMobile);
    const isTablet = useTypedSelector<"isTablet">(state => state.isTablet);
    const isOnDocument = useTypedSelector<"isOnDocument">(state => state.isOnDocument);
    const listItemRef = useRef<HTMLLIElement>(null);

    const isMobileOrTablet = isMobile || isTablet;

    const pointerHandler = (typeEvent: string) => {
        const listItem = listItemRef.current as HTMLLIElement;
        const top = listItem.firstElementChild as HTMLDivElement;
        const line = listItem.lastElementChild as HTMLDivElement;
        const topChildren = top.children as HTMLCollectionOf<HTMLSpanElement>;

        switch(typeEvent) {
            case "pointerenter":
            case "click":
                Array.from(topChildren).forEach(item => {
                    item.classList.add(styles.mainBlog_column__item___list____item_____top______active);
                });
                line.classList.add(styles.mainBlog_column__item___list____item_____lineActive);
                break;
            case "pointerleave":
                Array.from(topChildren).forEach(item => {
                    item.classList.remove(styles.mainBlog_column__item___list____item_____top______active);
                });
                line.classList.remove(styles.mainBlog_column__item___list____item_____lineActive);
                break;
        }
    }

    const callPointerHandler: PointerEventHandler<HTMLLIElement> = event => pointerHandler(event.type);

    useEffect(() => {
        if ( isMobileOrTablet && isOnDocument ) pointerHandler("pointerleave");
    }, [ isOnDocument ]);

    const pointerDown: PointerEventHandler<HTMLLIElement> = (event) => {
        event.stopPropagation();
        store.dispatch( setIsOnDocumentFalse() );
    }

    return(
        <li className={styles.mainBlog_column__item___list____item}
        ref={listItemRef}
        onPointerDown={pointerDown}
        onPointerEnter={isMobileOrTablet ? undefined : callPointerHandler}
        onPointerLeave={isMobileOrTablet ? undefined : callPointerHandler}
        onClick={isMobileOrTablet ? callPointerHandler : undefined}>
            <div className={styles.mainBlog_column__item___list____item_____top}>
                <span className={styles.mainBlog_column__item___list____item_____top______title}>
                    { title }
                </span>
                <span className={styles.mainBlog_column__item___list____item_____top______count}>
                    { count }
                </span>
            </div>
            <div className={styles.mainBlog_column__item___list____item_____line}></div>
        </li>
    )
}

export default MainBlogColumnItemListItem;