import { FunctionComponent, PointerEventHandler, useRef, useEffect } from "react";
import styles from "../../styles/about us/MainAboutUsThirdGroupTeamItem.module.scss";
import { useTypedSelector } from "../../lib/customHooks";
import store from "../../redux/store";
import { setIsOnDocumentFalse } from "../../redux/slices/isOnDocument";
import Image, { StaticImageData } from "next/image";

interface MainAboutUsThirdGroupTeamItemProps {
    img: StaticImageData;
    alt: string;
    index: string;
}

const MainAboutUsThirdGroupTeamItem: FunctionComponent<MainAboutUsThirdGroupTeamItemProps> = ({ img, alt, index }) => {
    const isMobile = useTypedSelector<"isMobile">(state => state.isMobile);
    const isTablet = useTypedSelector<"isTablet">(state => state.isTablet);
    const isOnDocument = useTypedSelector<"isOnDocument">(state => state.isOnDocument);

    const conteinerRef = useRef<HTMLDivElement>(null);

    const isMobileOrTablet = isMobile || isTablet;

    const onEnter = () => {
        const conteiner = conteinerRef.current as HTMLDivElement;
        const img = conteiner.querySelector("img") as HTMLImageElement;
        const back = conteiner.querySelector("div") as HTMLDivElement;

        img.classList.add(styles.mainAboutUs_thirdGroup__team___item____imgActive);
        back.classList.add(styles.mainAboutUs_thirdGroup__team___item____backActive);
    }

    const onLeave = () => {
        const conteiner = conteinerRef.current as HTMLDivElement;
        const img = conteiner.querySelector("img") as HTMLImageElement;
        const back = conteiner.querySelector("div") as HTMLDivElement;

        img.classList.remove(styles.mainAboutUs_thirdGroup__team___item____imgActive);
        back.classList.remove(styles.mainAboutUs_thirdGroup__team___item____backActive);
    }

    const onPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
        event.stopPropagation();
        store.dispatch( setIsOnDocumentFalse() );
    };

    useEffect(() => {
        if ( isMobileOrTablet && isOnDocument ) {
            onLeave();
        }
    }, [ isOnDocument ]);

    return(
        <div
        ref={conteinerRef}
        className={styles.mainAboutUs_thirdGroup__team___item}
        onPointerEnter={isMobileOrTablet ? undefined : onEnter}
        onPointerLeave={isMobileOrTablet ? undefined : onLeave}
        onClick={isMobileOrTablet ? onEnter : undefined}
        onPointerDown={isMobileOrTablet ? onPointerDown : undefined}
        >
            <Image 
            src={img}
            alt={alt}
            className={styles.mainAboutUs_thirdGroup__team___item____img}
            placeholder="blur"
            />
            <div className={styles.mainAboutUs_thirdGroup__team___item____back}>
                { `Part of team: ${index}` }
            </div>
        </div>
    )
}

export default MainAboutUsThirdGroupTeamItem;