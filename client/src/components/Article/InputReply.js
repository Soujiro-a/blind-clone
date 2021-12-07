import styles from "../../../styles/components/Article/InputComment.module.css";
import { AiOutlineCamera } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function InputReply({ show, commentId, clickInputReply }) {
  const loginState = useSelector((state) => state.user);
  const [content, setContent] = useState("");

  function onChangeInput(e) {
    setContent(e.target.value);
  }

  async function uploadComment() {
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/reply/create`,
      {
        comment: commentId,
        content,
      },
      {
        headers: {
          Authorization: "Bearer " + loginState.token,
        },
      }
    );

    if (!data) {
      return;
    }

    clickInputReply(false);
  }
  return (
    show && (
      <div className={styles["input-comment"]}>
        <AiOutlineCamera size={40} className={styles["icon"]} />
        <div className={styles["content-container"]}>
          <textarea
            className={styles["textarea"]}
            name="content"
            value={content}
            onChange={onChangeInput}
            placeholder="대댓글을 남겨주세요."
          ></textarea>
          <div className={styles["foot"]}>
            <a
              onClick={() => {
                clickInputReply(false);
              }}
            >
              취소
            </a>
            <a
              onClick={() => {
                uploadComment();
              }}
              className={content !== "" ? styles["active"] : undefined}
            >
              등록
            </a>
          </div>
        </div>
      </div>
    )
  );
}
