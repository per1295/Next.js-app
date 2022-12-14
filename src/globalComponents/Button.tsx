import { FunctionComponent, MouseEventHandler, PointerEventHandler, TransitionEventHandler, useEffect, useRef } from "react";
import styles from "../globalStyles/Button.module.scss";
import { useTypedSelector } from "../lib/customHooks";
import { setIsOnDocumentFalse } from "../redux/slices/isOnDocument";
import store from "../redux/store";

interface ButtonProps {
    children: JSX.Element | string;
    startColor: "green" | "white";
    className?: string;
    type?: "button" | "submit" | "reset";
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button: FunctionComponent<ButtonProps> = ({ children, startColor, className, type, onClick }) => {
    const isMobile = useTypedSelector<"isMobile">(state => state.isMobile);
    const isTablet = useTypedSelector<"isTablet">(state => state.isTablet);
    const isOnDocument = useTypedSelector<"isOnDocument">(state => state.isOnDocument);
    const buttonElem = useRef<HTMLButtonElement>(null);

    const isMobileOrTablet = isMobile || isTablet;

    useEffect(() => {
        if ( isMobileOrTablet ) {
            const button = buttonElem.current as HTMLButtonElement;
            if ( isOnDocument ) {
                if ( startColor === "green" ) {
                    button.classList.remove(styles.greenActive);
                } else {
                    button.classList.remove(styles.whiteActive);
                }
            }
        }
    }, [ isOnDocument, isMobileOrTablet ]);

    const onEnter: PointerEventHandler<HTMLButtonElement> & MouseEventHandler<HTMLButtonElement> = ( event ) => {
        const button = event.currentTarget as HTMLButtonElement;

        if ( startColor === "green" ) {
            button.classList.add(styles.greenActive);
        } else {
            button.classList.add(styles.whiteActive);
        }
    };

    const onLeave: PointerEventHandler<HTMLButtonElement> = ( event ) => {
        const button = event.currentTarget as HTMLButtonElement;

        if ( startColor === "green" ) {
            button.classList.remove(styles.greenActive);
        } else {
            button.classList.remove(styles.whiteActive);
        }
    };

    const onTransitionEnd: TransitionEventHandler<HTMLButtonElement> = ( event ) => event.stopPropagation();

    const onPointerDown: PointerEventHandler<HTMLButtonElement> = ( event ) => {
        event.stopPropagation();
        store.dispatch( setIsOnDocumentFalse() );
    }

    return(
        <button
        ref={buttonElem}
        className={`${startColor} ${className}`}
        type={type}
        onPointerEnter={isMobileOrTablet ? undefined : onEnter}
        onPointerLeave={isMobileOrTablet ? undefined : onLeave}
        onPointerDown={isMobileOrTablet ? onPointerDown : undefined}
        onClick={(event) => {
            if ( onClick ) onClick(event);
            if ( isMobileOrTablet ) onEnter(event);
        }}
        onTransitionEnd={onTransitionEnd}>
            { children }
        </button>
    )
}

export default Button;