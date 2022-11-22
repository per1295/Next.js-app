import Link from "next/link";
import { FunctionComponent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import type { PointerEventHandler } from "react";

interface NavLinkProps {
    href: string;
    className?: string | ((isActive: boolean) => string);
    children: string | JSX.Element;
    onPointerEnter?: PointerEventHandler;
    onPointerLeave?: PointerEventHandler;
}

const NavLink: FunctionComponent<NavLinkProps> = ({ href, className, children, onPointerEnter, onPointerLeave }) => {
    const [ realClassName, setRealClassName ] = useState<string | undefined>();
    const router = useRouter();

    useEffect(() => {
        if ( className instanceof Function ) {
            const regExp = new RegExp(`^${href}`, "i");
            const classNameRusult = className(regExp.test(router.pathname));
            setRealClassName(classNameRusult);
        } else if ( typeof className === "string" ) {
            setRealClassName(className);
        }
    }, [ router.pathname ]);

    return(
        <Link href={href} className={realClassName} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
            { children }
        </Link>
    )
}

export default NavLink;