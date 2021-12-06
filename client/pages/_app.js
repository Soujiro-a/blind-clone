import React, { useEffect } from "react";
import "../styles/globals.css";
import wrapper from "../src/store/configureStore";
import Layout from "../src/components/layout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../src/store/modules/user";

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   async function loginCheck() {
  //     if (process.browser) {
  //       const token = localStorage.getItem("token");
  //       if (!token) {
  //         return;
  //       }

  //       const { data } = await axios.get(
  //         `${process.env.NEXT_PUBLIC_SERVER_URL}/user/token`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       if (!data.email) {
  //         return;
  //       }

  //       dispatch(
  //         setUser({
  //           email: data.email,
  //           nickname: data.nickname,
  //           token: data.token,
  //         })
  //       );
  //     }
  //   }
  //   loginCheck();
  // }, [dispatch]);

  // useEffect(() => {

  // })

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default wrapper.withRedux(MyApp);
