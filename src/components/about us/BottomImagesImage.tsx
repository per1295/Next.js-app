import { FunctionComponent, PointerEventHandler, useEffect, useRef } from "react";
import styles from "../../styles/about us/BottomImagesImage.module.scss";
import { useTypedSelector, useDispatch } from "../../lib/customHooks";
import { setIsOnDocumentFalse } from "../../redux/slices/isOnDocument";
import Image, { StaticImageData } from "next/image";

interface BottomImagesImageProps {
    img: StaticImageData;
    alt: string;
}

const BottomImagesImage: FunctionComponent<BottomImagesImageProps> = ({ img, alt }) => {
    const isMobile = useTypedSelector<"isMobile">(state => state.isMobile);
    const isTablet = useTypedSelector<"isTablet">(state => state.isTablet);
    const isOnDocument = useTypedSelector<"isOnDocument">(state => state.isOnDocument);
    const dispatch = useDispatch();
    const imageRef = useRef<HTMLDivElement>(null);

    const isMobileOrTablet = isMobile || isTablet;

    useEffect(() => {
        if ( isMobileOrTablet && isOnDocument ) {
            const conteinerImage = imageRef.current as HTMLDivElement;
            conteinerImage.classList.remove(styles.mainAboutUs_thirdGroup__bottom___images____conteinerImageActive);
        }
    }, [ isOnDocument ]);

    const onEnter: PointerEventHandler<HTMLDivElement> = (event) => {
        const conteinerImage = event.currentTarget as HTMLDivElement;
        conteinerImage.classList.add(styles.mainAboutUs_thirdGroup__bottom___images____conteinerImageActive);
    }

    const onLeave: PointerEventHandler<HTMLDivElement> = (event) => {
        const conteinerImage = event.currentTarget as HTMLDivElement;
        conteinerImage.classList.remove(styles.mainAboutUs_thirdGroup__bottom___images____conteinerImageActive);
    }

    const onPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
        event.stopPropagation();
        dispatch( setIsOnDocumentFalse() );
    }

    return(
        <div
        ref={imageRef}
        onPointerEnter={isMobileOrTablet ? undefined : onEnter}
        onPointerLeave={isMobileOrTablet ? undefined : onLeave}
        onPointerDown={isMobileOrTablet ? onPointerDown : undefined}
        onClick={isMobileOrTablet ? onEnter : undefined}
        className={styles.mainAboutUs_thirdGroup__bottom___images____conteinerImage}>
            <Image
            src={img}
            alt={alt}
            className={styles.mainAboutUs_thirdGroup__bottom___images____conteinerImage_____img}
            placeholder="blur"
            />
        </div>
    )
}

export default BottomImagesImage