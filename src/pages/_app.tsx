import "../styles/index.scss";
import { useEffect, Suspense } from "react";
import type { AppProps } from 'next/app';
import { Provider } from "react-redux";
import store from "../redux/store";
import Layout from "../components/Layout";
import { setDevice, setOnDocument } from "../lib/functions";
import Head from "next/head";
import axios from "axios";

import "@fontsource/montserrat";
import "@fontsource/open-sans";

axios.defaults.baseURL = "/api";

export default function App({ Component, pageProps }: AppProps) {

    useEffect(() => {
        setDevice();

        window.addEventListener("orientationchange", setDevice);
        window.addEventListener("resize", setDevice);
        window.addEventListener("pointerdown", setOnDocument);

        return () => {
            window.removeEventListener("orientationchange", setDevice);
            window.removeEventListener("resize", setDevice);
            window.removeEventListener("pointerdown", setOnDocument);
        }
    }, []);

    return (
        <>
            <Head>
                <link rel="icon" type="image/png" href="/icon.png" />
            </Head>
            <Provider store={store}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        </>
    )
}