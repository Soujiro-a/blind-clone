import { useRouter } from "next/router";
import styles from "../../styles/pages/topics/id.module.css";
import Link from "next/link";
import axios from "axios";
import classNames from "classnames";
import GlobalArticleCard from "../../src/components/GlobalArticleCard";

export default function Id({ boardList, articleList }) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className={styles["main-container"]}>
      {boardList.length > 0 && (
        <section className={styles["board"]}>
          {boardList.map((board) => {
            return (
              <Link
                key={board._id}
                href={`/topics/${encodeURIComponent(board.slug)}`}
                passHref
              >
                <a
                  className={classNames({
                    [styles["board-item"]]: true,
                    [styles["active"]]: id === board.slug,
                  })}
                >
                  {board.title}
                </a>
              </Link>
            );
          })}
        </section>
      )}
      <section className={styles["article-list"]}>
        {articleList.map((a) => {
          return <GlobalArticleCard key={a._id} article={a} />;
        })}
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { data: boardList } = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/board/list`
  );

  if (!Array.isArray(boardList)) {
    return;
  }

  const { data: articleList } = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/board/${encodeURI(
      context.params.id
    )}`
  );

  if (!Array.isArray(articleList.article)) {
    return;
  }

  return {
    props: {
      boardList,
      articleList: articleList.article,
    },
  };
}
