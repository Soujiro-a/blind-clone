import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../styles/components/modal/Writing.module.css";
import Image from "next/image";
import { writing } from "../../store/reducers/modal";
import cancelImg from "../../../public/images/cancel.png";
import axios from "axios";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineCamera } from "react-icons/ai";
import { FiBarChart2, FiAtSign, FiHash } from "react-icons/fi";
import classNames from "classnames";
import ConfirmModal from "./Confirm";

export default function Writing() {
  const dispatch = useDispatch();
  const writingModalState = useSelector((state) => state.modal.writing);
  const [boardList, setBoardList] = useState([]);
  const [currentSelectedBoard, setCurrentSelectedBoard] = useState(0);
  const [isBoardSelected, setIsBoardSelected] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmTitle, serConfirmTitle] = useState("");
  const [article, setArticle] = useState({
    title: "",
    content: "",
  });

  const { title, content } = article;

  function onChangeInput(e) {
    const { name, value } = e.target;
    setArticle({
      ...article,
      [name]: value,
    });
  }

  async function getBoardList() {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/board/list`
    );
    if (!Array.isArray(data)) {
      return;
    }
    setBoardList(data);
  }

  useEffect(() => {
    getBoardList();
  }, []);

  function clickCurrentSelectBoard() {
    setIsBoardSelected(!isBoardSelected);
  }

  function clickBoard(index) {
    setCurrentSelectedBoard(index);
    setIsBoardSelected(false);
  }

  function closeConfirmModal() {
    setShowConfirmModal(false);
    serConfirmTitle("");
  }

  function confirmUploadModal() {
    setShowConfirmModal(true);
    serConfirmTitle(
      `'${boardList[currentSelectedBoard].title}'에 글을 등록하시겠습니까?`
    );
  }

  async function uploadArticle() {
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/article/create`,
      {
        title,
        content,
        board: boardList[currentSelectedBoard]._id,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    if (!data) {
      return;
    }

    closeConfirmModal();
    dispatch(writing(false));
  }

  function listenConfirm(confirm) {
    confirm ? uploadArticle() : closeConfirmModal();
  }
  return (
    writingModalState && (
      <div className="modal-outside">
        <div className={styles["writing-modal"]}>
          <div className={styles["head"]}>
            <a
              onClick={() => {
                dispatch(writing(false));
              }}
              className="close-btn"
            >
              <Image src={cancelImg} width={16} height={16} alt="X 버튼" />
            </a>
            <h5>글쓰기</h5>
            <a
              onClick={() => {
                confirmUploadModal();
              }}
            >
              등록
            </a>
          </div>
          {boardList.length > 0 && (
            <div className={styles["dropdown"]}>
              <a
                className={styles["current-select"]}
                onClick={() => clickCurrentSelectBoard()}
              >
                <span>{boardList[currentSelectedBoard].title}</span>
                <MdKeyboardArrowDown
                  size={30}
                  className={
                    isBoardSelected &&
                    classNames({
                      [styles["down-icon"]]: true,
                      [styles["rotated"]]: true,
                    })
                  }
                />
              </a>
              {isBoardSelected && (
                <div className={styles["board-container"]}>
                  {boardList.map((board, index) => {
                    return (
                      <div
                        key={board._id}
                        className={styles["board-item"]}
                        onClick={() => clickBoard(index)}
                      >
                        {board.title}
                      </div>
                    );
                  })}
                </div>
              )}
              <div className={styles["input-container"]}>
                <input
                  type="text"
                  name="title"
                  value={title}
                  className={styles["title"]}
                  placeholder="제목을 입력해주세요."
                  onChange={onChangeInput}
                />
                <textarea
                  name="content"
                  value={content}
                  className={styles["content"]}
                  placeholder="토픽에 맞지 않는 글로 판단되어 다른 유저로부터 일정 수 이상의 신고를 받는 경우 글이 자동으로 숨김처리 될 수 있습니다."
                  onChange={onChangeInput}
                ></textarea>
              </div>
              <div className={styles["foot"]}>
                <AiOutlineCamera size={45} className={styles["icon"]} />
                <FiBarChart2 size={45} className={styles["icon"]} />
                <FiAtSign size={45} className={styles["icon"]} />
                <FiHash size={45} className={styles["icon"]} />
              </div>
            </div>
          )}
        </div>
        <ConfirmModal
          show={showConfirmModal}
          title={confirmTitle}
          listenConfirm={listenConfirm}
        />
      </div>
    )
  );
}
