import Head from "next/head";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const TheMain = dynamic(() => import("../../components/home/TheMain"));

export default function Home() {
    return(
        <Suspense fallback={<div className="loading"/>}>
            <Head>
                <title>Home</title>
            </Head>
            <TheMain/>
        </Suspense>
    )
}