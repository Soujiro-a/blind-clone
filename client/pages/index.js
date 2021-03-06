import React from "react";
import axios from "axios";
import Head from "next/head";
import BestBoardCard from "../src/components/Main/BestBoardCard";
import BoardCard from "../src/components/Main/BoardCard";
import Searchbar from "../src/components/Searchbar";
import RealtimeFamousCompany from "../src/components/Main/RealtimeFamousCompany";
import styles from "../styles/pages/index.module.css";
import { setUser } from "../src/store/modules/user";
import wrapper from "../src/store/configureStore";

const Home = ({ mainContent, boardList, famousCompanyList }) => {
  return (
    <div>
      <Head>
        <title>HOME | KKY</title>
      </Head>
      <div className={styles["main-container"]}>
        <main>
          <Searchbar />
          <BestBoardCard
            articleList={mainContent[0].content}
            boardList={boardList}
          />
          <div className={styles["board-card-container"]}>
            {mainContent.map(({ title, slug, content }) => {
              return (
                <BoardCard
                  key={slug}
                  title={title}
                  slug={slug}
                  articleList={content}
                />
              );
            })}
          </div>
        </main>
        <RealtimeFamousCompany famousCompanyList={famousCompanyList} />
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      if (req.cookies.token) {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/token`,
          {
            headers: {
              Authorization: "Bearer " + req.cookies.token,
            },
          }
        );
        store.dispatch(
          setUser({
            email: data.email,
            nickname: data.nickname,
            token: data.token,
          })
        );
      }
      let { data: contentData } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/board/main`
      );
      if (contentData.error) {
        return;
      }

      const { data: listData } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/board/list`
      );

      if (!Array.isArray(listData)) {
        return;
      }

      const boardList = {};

      listData.forEach((v) => {
        boardList[v._id] = v.title;
      });

      const { data: famousCompanyList } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/company/list/famous`
      );

      return {
        props: {
          mainContent: contentData.content,
          boardList,
          famousCompanyList,
        },
      };
    }
);

export default Home;
