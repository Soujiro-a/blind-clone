import Link from "next/link";
import styles from "../../../styles/components/Main/BoardCard.module.css";
import { BsEye } from "react-icons/bs";

export default function BoardCard({ title, slug, articleList }) {
  return (
    <div className={styles["board-card"]}>
      <div className={styles["head"]}>
        <div className={styles["title-side"]}>
          <div className={styles["board-icon"]}></div>
          <h2>{title}</h2>
        </div>
        <Link href={`/topics/${encodeURIComponent(slug)}`} passHref>
          <a>더보기 {`>`}</a>
        </Link>
      </div>
      <div className={styles["body"]}>
        <ul className={styles["article-list"]}>
          {articleList.map((article) => {
            return (
              <li key={article._id}>
                <span className={styles["article-title"]}>{article.title}</span>
                <div className={styles["count-display"]}>
                  <div className={styles["count-item"]}>
                    <BsEye className={styles["icon"]} />
                    {article.viewCount}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
