import Head from "next/head";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const TheMainServices = dynamic(() => import("../components/services/TheMainServices"));
const TheMainThirdGroup = dynamic(() => import("../globalComponents/TheMainThirdGroup"));

export default function Services() {
    return(
        <Suspense fallback={<div className="preloader"/>}>
            <Head>
                <title>Services</title>
            </Head>
            <TheMainServices/>
            <TheMainThirdGroup/>
        </Suspense>
    )
}