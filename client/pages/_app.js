import React from "react";
import "../styles/globals.css";
import wrapper from "../src/store/configureStore";
import GNB from "../src/components/GNB";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
