import { useRef, useEffect } from "react";
import { useTypedSelector, useDispatch } from "../lib/customHooks";
import styles from "../globalStyles/TheHeaderNavLinksMobile.module.scss";
import { setMenuClose } from "../redux/slices/isMenuOpen";
import { useRouter } from "next/router";
import NavLink from "../globalComponents/NavLink";

interface Animations {
    animation: Animation | undefined;
    childrenAnimations: Set<Animation>;
}

type AnimationsKeys = keyof Animations;
type AnimationsValues = Animations[AnimationsKeys];

const animationsInit = new Map();
animationsInit.set("animation", undefined);
animationsInit.set("childrenAnimations", new Set());

export default function TheHeaderNavLinksMobile() {
    const ulElem = useRef<HTMLUListElement>(null);
    const timeoutsRef = useRef<Set<NodeJS.Timeout>>(new Set());
    const animationsRef = useRef<Map<AnimationsKeys, AnimationsValues>>(animationsInit);
    const isMenuOpen = useTypedSelector<"isMenuOpen">(state => state.isMenuOpen);
    const dispatch = useDispatch();
    const router = useRouter();

    const navLinksArray = [ "Home", "about us", "services", "blog", "contact us" ];
    const ulHeight = 338;
    const ulAnimationFrames = [
        {
            height: 0,
            transform: "scaleY(0)"
        },
        {
            height: `${ulHeight}px`,
            transform: "scaleY(1)"
        }
    ];
    const ulChildrenFrames = [
        {
            transform: "translateX(-20px)",
            opacity: 0
        },
        {
            transform: "translateX(0)",
            opacity: 1
        }
    ];

    useEffect(() => {
        const animations = animationsRef.current;

        if ( animations.get("animation") ) {
            timeoutsRef.current = new Set();
            animations.set("animation", undefined);
            animations.set("childrenAnimations", new Set());
        }

        dispatch( setMenuClose() );
    }, [ router.pathname ]);

    useEffect(() => {
        const ul = ulElem.current as HTMLUListElement;
        const animations = animationsRef.current;
        const timeouts = timeoutsRef.current;

        const animation = animations.get("animation") as Animation | undefined;
        const childrenAnimations = animations.get("childrenAnimations") as Set<Animation>;
        const ulChildren = ul.children as HTMLCollectionOf<HTMLLIElement>;
        const children = Array.from(ulChildren);

        const onFinish = () => ul.classList.remove(styles.header_navLinksMobileStart);

        if ( isMenuOpen ) {
            ul.classList.add(styles.header_navLinksMobileStart);
            if ( animation ) {
                animation.removeEventListener("finish", onFinish);
                const timeout = setTimeout(() => {
                    animation.reverse();
                    Array.from(childrenAnimations).forEach((item, index) => {
                        const childTimeout = setTimeout(() => item.reverse(), 100 * index);
                        timeouts.add(childTimeout);
                    });
                }, 0);
                timeouts.add(timeout);
            } else {
                const timeout = setTimeout(() => {
                    const animationItem = ul.animate(ulAnimationFrames, {
                        duration: 500,
                        easing: "linear",
                        fill: "forwards"
                    });
                    animations.set("animation", animationItem);
    
                    children.forEach((item, index) => {
                        const childTimeout = setTimeout(() => {
                            const childrenAnimationsItem = item.animate(ulChildrenFrames, {
                                duration: 250,
                                easing: "linear",
                                fill: "forwards"
                            });
                            if ( !childrenAnimations.has(childrenAnimationsItem) ) childrenAnimations.add(childrenAnimationsItem);
                        }, 100 * index);
                        timeouts.add(childTimeout);
                    });
                }, 0);
                timeouts.add(timeout);
            }
        } else {
            if ( animation ) {
                animation.addEventListener("finish", onFinish);
                animation.reverse();
            } else {
                onFinish();
            }

            Array.from(childrenAnimations).reverse().forEach((item, index) => {
                const childTimeout = setTimeout(() => item.reverse(), 100 * index);
                timeouts.add(childTimeout);
            });
        }

        return () => {
            timeouts.forEach(item => clearTimeout(item));
            timeouts.clear();
            if ( animation ) animation.removeEventListener("finish", onFinish);
        }
    }, [ isMenuOpen ]);

    return(
        <ul ref={ulElem} className={styles.header_navLinksMobile}>
            {
                navLinksArray.map((item, index) => (
                    <li key={index} className={styles.header_navLinksMobile__item}>
                        <NavLink
                        href={`/${item.split(" ")[0].toLowerCase()}`}
                        className={
                            ( isActive ) =>
                            isActive
                            ?
                            `${styles.header_navLinksMobile__item___href} ${styles.header_navLinksMobile__item___hrefActive}`
                            :
                            styles.header_navLinksMobile__item___href
                        }>
                            { item }
                        </NavLink>
                    </li>
                ))
            }
        </ul>
    )
}