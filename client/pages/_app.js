import React, { useEffect } from "react";
import "../styles/globals.css";
import wrapper from "../src/store/configureStore";
import Layout from "../src/components/layout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../src/store/reducers/user";

function MyApp({ Component, pageProps, data }) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginCheck() {
      if (process.browser) {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/token`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!data.email) {
          return;
        }

        dispatch(
          setUser({
            email: data.email,
            nickname: data.nickname,
            token: data.token,
          })
        );
      }
    }
    loginCheck();
  }, [dispatch]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);
