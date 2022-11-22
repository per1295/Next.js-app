import Head from "next/head";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const TheMainAboutUs = dynamic(() => import("../components/about us/TheMainAboutUs"));

export default function AboutUs() {
    return (
        <Suspense fallback={<div className="preloader"/>}>
            <Head>
                <title>About</title>
            </Head>
            <TheMainAboutUs/>
        </Suspense>
    )
}