import { useState, useEffect, useRef, Suspense } from "react";
import { useTypedSelector } from "../lib/customHooks";
import Head from "next/head";
import dynamic from "next/dynamic";

const TheMainBlog = dynamic(() => import("../components/blog/TheMainBlog"));
const TheMainThirdGroup = dynamic(() => import("../globalComponents/TheMainThirdGroup"));
const TheMobileChanger = dynamic(() => import("../components/blog/TheMobileChanger"));

export default function Contact() {
	const isMobile = useTypedSelector<"isMobile">(state => state.isMobile);
	const mobileScrollRef = useRef<number>(0);
	const [ isShowChanger, setIsShowChanger ] = useState(true);

	const mobileScrolling = () => {
		const y = Math.floor(scrollY);
		if ( y > mobileScrollRef.current ) {
			setIsShowChanger(false);
		}
		else {
			setIsShowChanger(true)
		};
		mobileScrollRef.current = y;
	}

	useEffect(() => {
		if ( isMobile ) document.addEventListener("scroll", mobileScrolling);

		return () => {
			document.removeEventListener("scroll", mobileScrolling);
		}
	}, [ isMobile ]);

	return (
		<Suspense fallback={<div className="preloader"/>}>
			<Head>
                <title>Blog</title>
            </Head>
			<TheMainBlog/>
			<TheMainThirdGroup/>
			{ isMobile ? <TheMobileChanger isShow={isShowChanger}/> : null }
		</Suspense>	
	)
}