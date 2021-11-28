import styles from "../../styles/components/GlobalArticleCard.module.css";
import { MdThumbUp } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { BsEye, BsBookmark } from "react-icons/bs";
import timeGap from "../function/time";
import Link from "next/link";

export default function GlobalArticleCard({ article }) {
  return (
    <article className={styles["article"]}>
      <div className={styles["head"]}>
        <Link href={`/post/${encodeURIComponent(article.key)}`}>
          <a>{article.title}</a>
        </Link>
      </div>
      <div className={styles["body"]}>
        <Link
          href={`/post/${encodeURIComponent(article.key)}`}
          className={styles["content"]}
        >
          <a>{article.content}</a>
        </Link>
        <div className={styles["info"]}>
          <Link
            href={`/post/${encodeURIComponent(article.key)}`}
            className={styles["company"]}
          >
            <a>{article.author.company.name}</a>
          </Link>
          <Link href={`/post/${encodeURIComponent(article.key)}`}> · </Link>
          <Link
            href={`/post/${encodeURIComponent(article.key)}`}
            className={styles["nickname"]}
          >
            <a>{article.author.nickname}</a>
          </Link>
        </div>
      </div>
      <div className={styles["foot"]}>
        <div className={styles["foot-left"]}>
          <Link href={`/post/${encodeURIComponent(article.key)}`} passHref>
            <a className={styles["count"]}>
              <BsEye className={styles["icon"]} size={15} />
              {article.viewCount}
            </a>
          </Link>
          <Link href={`/post/${encodeURIComponent(article.key)}`} passHref>
            <a className={styles["count"]}>
              <MdThumbUp className={styles["icon"]} size={15} />
              {article.thumbupCount}
            </a>
          </Link>
          <Link href={`/post/${encodeURIComponent(article.key)}`} passHref>
            <a className={styles["count"]}>
              <FaRegComment className={styles["icon"]} size={15} />
              {article.commentCount}
            </a>
          </Link>
        </div>
        <div className={styles["foot-right"]}>
          <Link href={`/post/${encodeURIComponent(article.key)}`} passHref>
            <a className={styles["count"]}>
              {timeGap(article.createdAt)}
              <BsBookmark className={styles["icon-right"]} size={15} />
            </a>
          </Link>
        </div>
      </div>
    </article>
  );
}
