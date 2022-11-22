import Head from "next/head";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const TheMainContact = dynamic(() => import("../../components/contact/TheMainContact"));

export default function Contact() {
    return(
        <Suspense fallback={<div className="loading"/>}>
            <Head>
                <title>Contact</title>
            </Head>
            <TheMainContact/>
        </Suspense>
    )
}