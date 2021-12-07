import styles from "../../../styles/components/Article/InputComment.module.css";
import { AiOutlineCamera } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function InputComment({ enlarge = false, articleId }) {
  const loginState = useSelector((state) => state.user);
  const [isLarge, setIsLarge] = useState(enlarge);
  const [content, setContent] = useState("");

  function onChangeInput(e) {
    setContent(e.target.value);
  }

  function clickCommentContainer(bool) {
    setIsLarge(bool);
  }

  async function uploadComment() {
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/comment/create`,
      {
        article: articleId,
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

    clickCommentContainer(false);
  }
  return (
    <div className={styles["input-comment"]}>
      <AiOutlineCamera size={40} className={styles["icon"]} />
      {!isLarge ? (
        <div
          onClick={() => {
            clickCommentContainer(true);
          }}
          className={styles["empty"]}
        >
          댓글을 남겨주세요.
        </div>
      ) : (
        <div className={styles["content-container"]}>
          <textarea
            className={styles["textarea"]}
            name="content"
            value={content}
            onChange={onChangeInput}
            placeholder="댓글을 남겨주세요."
          ></textarea>
          <div className={styles["foot"]}>
            <a
              onClick={() => {
                clickCommentContainer(false);
              }}
            >
              취소
            </a>
            <a
              onClick={() => {
                uploadComment(false);
              }}
              className={content !== "" ? styles["active"] : undefined}
            >
              등록
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
