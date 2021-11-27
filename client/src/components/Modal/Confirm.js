import styles from "../../../styles/components/modal/Confirm.module.css";
import classNames from "classnames";

export default function Confirm({
  show,
  title,
  confirmBtnText = "확인",
  listenConfirm,
}) {
  return (
    show && (
      <div className="modal-outside">
        <div className={styles["confirm-modal"]}>
          <div className={styles["title"]}>{title}</div>
          <div className={styles["btn-container"]}>
            <button
              className={classNames({
                [styles["cancel"]]: true,
                ["btn"]: true,
              })}
              onClick={() => {
                listenConfirm(false);
              }}
            >
              취소
            </button>
            <button
              className={classNames({
                [styles["confirm"]]: true,
                ["btn"]: true,
              })}
              onClick={() => {
                listenConfirm(true);
              }}
            >
              {confirmBtnText}
            </button>
          </div>
        </div>
      </div>
    )
  );
}
