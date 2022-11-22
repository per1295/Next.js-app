import { PointerEventHandler, useEffect, useRef } from "react";
import styles from "../globalStyles/TheHeaderTopNavLinks.module.scss";
import { useTypedSelector, useDispatch } from "../lib/customHooks";
import { setMenuClose } from "../redux/slices/isMenuOpen";
import { useRouter } from "next/router";
import NavLink from "./NavLink";

export default function TheHeaderTopMenuNavLinks() {
    const isMenuOpen = useTypedSelector((state) => state.isMenuOpen) as boolean;
    const dispatch = useDispatch();
    const navLinksElem = useRef<HTMLDivElement>(null);
    const timeoutsRef = useRef<Set<NodeJS.Timeout>>(new Set());
    const router = useRouter();
    const navLinksArray = [ "Home", "about us", "services", "blog", "contact us" ];

    useEffect(() => {
        const navLinks = navLinksElem.current as HTMLDivElement;
        navLinks.classList.add(styles.navLinksNavigate);

        dispatch( setMenuClose() );
    }, [ router.pathname ]);

    useEffect(() => {
        const navLinks = navLinksElem.current as HTMLDivElement;
        const timeouts = timeoutsRef.current;

        const navLinksChildren = navLinks.children as HTMLCollectionOf<HTMLAnchorElement>;
        const firstNavLink = Array.from(navLinksChildren)[0];

        const firstNavLinkListener = () => {
            navLinks.classList.remove(styles.header_top__navLinksActive);
        }

        if ( isMenuOpen ) {
            navLinks.classList.remove(styles.navLinksNavigate);
            navLinks.classList.add(styles.header_top__navLinksActive);

            firstNavLink.removeEventListener("transitionend", firstNavLinkListener);

            Array.from(navLinksChildren).forEach((item, index) => {
                const timeoutLink = setTimeout(() => {
                    item.classList.add(styles.header_top__navLinks___linkAppear);
                }, 250 * index);
                timeouts.add(timeoutLink);
            });
        } else {
            firstNavLink.addEventListener("transitionend", firstNavLinkListener);

            const reverseNavLinksChildren = Array.from(navLinksChildren).reverse();

            reverseNavLinksChildren.forEach((item, index) => {
                const timeoutLink = setTimeout(() => {
                    item.classList.remove(styles.header_top__navLinks___linkAppear);
                }, 250 * index);
                timeouts.add(timeoutLink);
            });
        }

        return () => {
            timeouts.forEach(item => clearTimeout(item));
            timeouts.clear();
            firstNavLink.removeEventListener("transitionend", firstNavLinkListener);
        }
    }, [ isMenuOpen ]);

    const onEnter: PointerEventHandler = ( event ) => {
        const navLink = event.currentTarget as HTMLLinkElement;
        const isActive = navLink.classList.contains(styles.header_top__navLinks___linkActive);

        if ( !isActive ) {
            navLink.classList.add(styles.header_top__navLinks___linkEnter);
        }
    }

    const onLeave: PointerEventHandler = ( event ) => {
        const navLink = event.currentTarget as HTMLLinkElement;
        const isActive = navLink.classList.contains(styles.header_top__navLinks___linkActive);

        if ( !isActive ) {
            navLink.classList.remove(styles.header_top__navLinks___linkEnter);
        }
    }

    return(
        <div className={styles.header_top__navLinks} ref={navLinksElem}>
            {
                navLinksArray.map((item, index) => (
                    <NavLink key={index} href={`/${item.split(" ")[0].toLowerCase()}`} className={
                        ( isActive ) => (
                            isActive
                            ?
                            `${styles.header_top__navLinks___link} ${styles.header_top__navLinks___linkActive}`
                            :
                            styles.header_top__navLinks___link
                        )
                    }
                    onPointerEnter={onEnter}
                    onPointerLeave={onLeave}>
                        { item }
                    </NavLink>
                ))
            }
        </div>
    )
}