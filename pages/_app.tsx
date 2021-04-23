import Head from "next/head";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Sidebar, Topbar, Content } from "../components";
import { theme } from "../lib/theme";

const queryClient = new QueryClient();

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>OnlyDevs</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://unpkg.com/mvp.css" />
      </Head>

      <Providers>
        <GlobalStyles />
        <Topbar />
        <Content showPost>
          <Component {...pageProps} />
        </Content>
        <Sidebar />
      </Providers>
    </>
  );
}

function Providers({ children }) {
  return [
    <ThemeProvider theme={theme} />,
    <QueryClientProvider client={queryClient} />,
    children,
  ].reduceRight((prev, provider) => React.cloneElement(provider, {}, prev));
}

const GlobalStyles = createGlobalStyle(
  ({ theme }) => `
  body {
    margin: 0;
    padding: 0;
    color: #fff;

    background-color: ${theme.colours.background[0]};
  }
`
);

export default App;
