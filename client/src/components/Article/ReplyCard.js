import styles from "../../../styles/components/Article/CommentCard.module.css";
import { MdThumbUp } from "react-icons/md";
import { BsWatch } from "react-icons/bs";
import timeGap from "../../function/timeGap";
import classNames from "classnames";

export default function ReplyCard({ comment }) {
  return (
    <div
      className={classNames({
        [styles["comment"]]: true,
        [styles["reply"]]: true,
      })}
    >
      <div className={styles["head"]}>
        <span style={{ color: "#37acc9" }}>{comment.author.company.name}</span>
        <span>·</span>
        <span>{comment.author.nickname}</span>
      </div>
      <div className={styles["body"]}>
        <div className={styles["content"]}>{comment.content}</div>
      </div>
      <div className={styles["foot"]}>
        <span>
          <BsWatch className={styles["icon"]} />
          {timeGap(comment.createdAt)}
        </span>
        <span>
          <MdThumbUp className={styles["icon"]} />
          {comment.thumbupCount}
        </span>
      </div>
    </div>
  );
}
