import React from "react";
import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import wrapper from "../src/store/configureStore";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
