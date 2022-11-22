import { FunctionComponent, useEffect } from "react";
import { useTypedSelector } from "../../lib/customHooks"; 
import styles from "../../styles/home/TheMainSecondGroupCategoryRightItem.module.scss";
import Image, { StaticImageData } from "next/image";

interface TheMainSecondGroupCategoryRightItemProps {
    showForCategories: string[];
    src: StaticImageData;
    alt: string;
    index: number;
}

const TheMainSecondGroupCategoryRightItem: FunctionComponent<TheMainSecondGroupCategoryRightItemProps>
=
({ showForCategories, src, alt, index }) => {
    const categoryOption = useTypedSelector<"categoryOption">((state) => state.categoryOption);

    const transitionend = (event: TransitionEvent) => {
        const currentTarget = event.currentTarget as HTMLImageElement;
        currentTarget.classList.add(styles.category_itemVanishComplete);
    }

    useEffect(() => {
        const item = document.querySelector<HTMLImageElement>(`.${styles.category_item}:nth-child(${index})`);
        let timeout: NodeJS.Timeout;

        if ( item ) {
            if ( !showForCategories.includes(categoryOption) ) {
                item.addEventListener("transitionend", transitionend);
                item.classList.add(styles.category_itemVanish);
            } else {
                item.classList.remove(styles.category_itemVanishComplete);
                timeout = setTimeout(() => {
                    item.classList.remove(styles.category_itemVanish);
                }, 0);
            }
        }

        return () => {
            if ( item ) item.removeEventListener("transitionend", transitionend);
            clearTimeout(timeout);
        }
    }, [ categoryOption ]);

    return(
        <Image src={src} alt={alt} className={styles.category_item} placeholder="blur"/>
    )
}

export default TheMainSecondGroupCategoryRightItem;