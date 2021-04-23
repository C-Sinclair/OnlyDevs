import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>OnlyDevs</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://unpkg.com/mvp.css" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
