import React from "react";
import "../styles/globals.css";
import wrapper from "../src/store/configureStore";
import Layout from "../src/components/layout";
import cookies from "next-cookies";
import { setToken } from "../server/tokenManager";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const allCookies = cookies(ctx);
  const tokenByCookie = allCookies["token"];
  if (tokenByCookie) {
    setToken(tokenByCookie);
  }

  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default wrapper.withRedux(MyApp);
