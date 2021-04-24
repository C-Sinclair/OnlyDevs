import Head from "next/head";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Sidebar, Topbar, Content } from "../components";
import { theme } from "../lib/theme";
import { AuthProvider, useAuth } from "../hooks/auth";

const queryClient = new QueryClient();

function App({ Component, pageProps }) {
  const { loggedIn } = useAuth()
  return (
    <>
      <Head>
        <title>OnlyDevs</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://unpkg.com/mvp.css" />
        <link
          rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200;0,400;0,600;0,700;1,200;1,400;1,600;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;700;800&display=swap" rel="stylesheet" />
      </Head>

      <Providers>
        <GlobalStyles />
        <Topbar />
        <Content showPost={loggedIn}>
          <Component {...pageProps} />
        </Content>
        <Sidebar />
      </Providers>
    </>
  );
}

/**
 * Oooft so clean! 
 */
function Providers({ children }) {
  return [
    <AuthProvider />,
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
    color: ${theme.colours.text[0]};
    font-family: ${theme.fonts.main};
    background-color: ${theme.colours.background[0]};
  }
`
);

export default App;
