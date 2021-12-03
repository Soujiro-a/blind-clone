import styles from "../../styles/pages/post/key.module.css";
import Image from "next/image";
import axios from "axios";
import Breadcrumb from "../../src/components/Article/Breadcrumb";
import CommentCard from "../../src/components/Article/CommentCard";
import CommentList from "../../src/components/Article/CommentList";
import ContentCard from "../../src/components/Article/ContentCard";
import InputComment from "../../src/components/Article/InputComment";
import RecommendArticleList from "../../src/components/Article/RecommendArticleList";
import { MdThumbUp } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { BsEye, BsBookmark, BsWatch, BsThreeDots } from "react-icons/bs";

export default function Key({ article, comment }) {
  const createdAt = new Date(article.createdAt);
  return (
    <div className={styles["main-container"]}>
      <main>
        <Breadcrumb title={article.board.title} slug={article.board.slug} />
        <h1>{article.title}</h1>
        <div className={styles["company"]}>
          <span style={{ color: "#37acc9" }}>
            {article.author.company.name}
          </span>
          <span>·</span>
          <span>{article.author.nickname}</span>
        </div>
        <div className={styles["info"]}>
          <div className={styles["left"]}>
            <span>
              <BsWatch className={styles["icon"]} />
              {`${createdAt.getMonth()}-${createdAt.getDate()}`}
            </span>
            <span>
              <BsEye className={styles["icon"]} />
              {article.viewCount}
            </span>
            <span>
              <FaRegComment className={styles["icon"]} />
              {article.commentCount}
            </span>
          </div>
          <div className={styles["right"]}>
            <span>
              <BsBookmark className={styles["icon"]} />
            </span>
            <span>
              <BsThreeDots className={styles["icon"]} />
            </span>
          </div>
        </div>
        <div className={styles["content"]}>{article.content}</div>
        {article.articleImgAddress && (
          <picture className={styles["article-image"]}>
            <Image
              src={`https://blind-clone-nextjs.s3.ap-northeast-2.amazonaws.com/${article.articleImgAddress}`}
              alt={`${article.articleImgAddress}`}
              width={450}
              height={450}
            />
          </picture>
        )}
        <div className={styles["action"]}>
          <div className={styles["left"]}>
            <span>
              <MdThumbUp className={styles["icon"]} />
              {article.thumbupCount}
            </span>
            <span>
              <FaRegComment className={styles["icon"]} />
              {article.commentCount}
            </span>
          </div>
        </div>
        <section className={styles["comment"]}>
          <h5>댓글 {article.commentCount}</h5>
          <InputComment articleId={article._id} />
          <div className={styles["comment-list"]}>
            {comment.map((c) => {
              return <CommentCard key={c._id} comment={c} />;
            })}
          </div>
        </section>
      </main>
      <RecommendArticleList />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/article/${encodeURI(
      context.params.key
    )}`
  );

  const article = data.article;
  const comment = data.comment;

  return {
    props: {
      article,
      comment,
    },
  };
}
