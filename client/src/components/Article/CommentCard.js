import styles from "../../../styles/components/Article/CommentCard.module.css";
import { MdThumbUp } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { BsWatch } from "react-icons/bs";
import timeGap from "../../function/timeGap";
import { useState } from "react";
import InputReply from "./InputReply";
import ReplyCard from "./ReplyCard";

export default function CommentCard({ comment }) {
  const [showReplyInputField, setShowReplyInputField] = useState(false);

  function clickInputReply(confirm) {
    confirm ? setShowReplyInputField(true) : setShowReplyInputField(false);
  }

  return (
    <div>
      <div className={styles["comment"]}>
        <div className={styles["head"]}>
          <span style={{ color: "#37acc9" }}>
            {comment.author.company.name}
          </span>
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
          <span>
            <FaRegComment className={styles["icon"]} />
            {comment.replyCount}
          </span>
          <div
            onClick={() => {
              clickInputReply(true);
            }}
          >
            대댓글 입력
          </div>
        </div>
      </div>
      <InputReply
        show={showReplyInputField}
        commentId={comment._id}
        clickInputReply={clickInputReply}
      />
      {comment.replies.map((reply) => {
        return <ReplyCard key={reply._id} comment={reply} />;
      })}
    </div>
  );
}
