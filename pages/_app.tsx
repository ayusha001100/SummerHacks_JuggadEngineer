import "../styles/globals.css";
import type { AppProps } from "next/app";
import { FinanceProvider } from '../lib/FinanceContext';
import Head from 'next/head';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FinanceProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title>FINFUTURE | Experience Wealth</title>
      </Head>
      
      {/* GSAP FOUNDATION */}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="beforeInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="beforeInteractive" />

      <Component {...pageProps} />
    </FinanceProvider>
  );
}
