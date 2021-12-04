import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../styles/pages/topics/id.module.css";
import GlobalArticleCard from "../../src/components/GlobalArticleCard";

export default function Query({ articleList }) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className={styles["main-container"]}>
      <section>
        <strong>{id} </strong>
        검색결과
      </section>
      <section className={styles["total"]}>전체({articleList.length})</section>
      <section className={styles["article-list"]}>
        {articleList.map((a) => {
          return <GlobalArticleCard key={a._id} article={a} />;
        })}
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { data: articleList } = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/search/${encodeURI(
      context.params.id
    )}`
  );

  if (!Array.isArray(articleList.article)) {
    return;
  }

  return {
    props: {
      articleList: articleList.article,
    },
  };
}
