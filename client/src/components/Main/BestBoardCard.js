import Link from "next/link";
import styles from "../../../styles/components/Main/BoardCard.module.css";
import { MdThumbUp } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import classNames from "classnames";

export default function BestBoardCard({ articleList, boardList }) {
  return (
    <div
      className={classNames({
        [styles["board-card"]]: true,
        [styles["best"]]: true,
      })}
    >
      <div className={styles["head"]}>
        <div className={styles["title-side"]}>
          <div className={styles["board-icon"]}></div>
          <h2>토픽 베스트</h2>
        </div>
        <Link href={`/topics/${encodeURIComponent("토픽-베스트")}`} passHref>
          <a>더보기 {`>`}</a>
        </Link>
      </div>
      <div className={styles["body"]}>
        <ul className={styles["article-list"]}>
          {articleList.map((article) => {
            return (
              <li key={article._id}>
                <div className={styles["article-title"]}>
                  <span className={styles["board-tag"]}>
                    <Link
                      href={`/topics/${encodeURIComponent(
                        boardList[article.board]
                      )}`}
                      passHref
                    >
                      {boardList[article.board]}
                    </Link>
                  </span>
                  <Link
                    href={`/post/${encodeURIComponent(article.key)}`}
                    passHref
                  >
                    {article.title}
                  </Link>
                </div>
                <div className={styles["count-display"]}>
                  <div className={styles["count-item"]}>
                    <MdThumbUp className={styles["icon"]} />
                    <span>{article.thumbupCount}</span>
                  </div>
                  <Link
                    href={`/post/${encodeURIComponent(article.key)}`}
                    passHref
                  >
                    <a className={styles["count-item"]}>
                      <FaRegComment className={styles["icon"]} />
                      <span>{article.commentCount}</span>
                    </a>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
