import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginClose, loginDirectOpen } from "../../store/reducers/modal";
import { setUser } from "../../store/reducers/user";
import Image from "next/image";
import styles from "../../../styles/components/modal/login.module.css";
import cancelImg from "../../../public/images/cancel.png";
import axios from "axios";

export default function Login() {
  const dispatch = useDispatch();
  const loginModalState = useSelector((state) => state.modal.login);

  const initialLeftTime = 180;
  let initialDisplayTime = "3분";
  const [leftTime, setLeftTime] = useState(initialLeftTime);
  const [displayTime, setDisplayTime] = useState(initialDisplayTime);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    function timeModifier() {
      setLeftTime((prevState) => prevState - 1);
      if (leftTime <= 0) {
        setLeftTime(initialLeftTime);
        setDisplayTime(initialDisplayTime);
      } else if (leftTime >= 120) {
        setDisplayTime(`2분 ${leftTime - 120 - 1}초`);
      } else if (leftTime >= 60) {
        setDisplayTime(`1분 ${leftTime - 60 - 1}초`);
      } else {
        setDisplayTime(`${leftTime - 1}초`);
      }
    }
    if (loginModalState.show) {
      const countdown = setInterval(() => {
        timeModifier();
      }, 1000);

      return () => {
        clearInterval(countdown);
      };
    }
  }, [initialDisplayTime, leftTime, loginModalState.show]);

  const { email, password } = loginInfo;

  function loginInfoChange(e) {
    const { value, name } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  }

  async function loginWithEmail() {
    const { data } = await axios.post("http://localhost:5000/user/signin", {
      email,
      password,
    });

    // 로그인 에러 캐치
    if (data.error) {
      return;
    }

    dispatch(setUser({ email: data.email, nickname: data.nickname }));
    dispatch(loginClose());
  }

  return (
    loginModalState.show && (
      <div className="modal-outside">
        <div className={styles["login-modal"]}>
          <div className={styles["head"]}>
            <h5>
              {loginModalState.directLogin
                ? "로그인"
                : "블라인드 OTP 안전 인증"}
            </h5>
            <a
              onClick={() => {
                dispatch(loginClose());
              }}
              className="close-btn"
            >
              <Image src={cancelImg} width={16} height={16} alt="X 버튼" />
            </a>
          </div>
          {loginModalState.directLogin ? (
            <div className={styles["body"]}>
              <div className={styles["row"]}>
                <label htmlFor="user-email">이메일</label>
                <input
                  name="email"
                  id="user-email"
                  type="email"
                  onChange={loginInfoChange}
                  value={email}
                />
              </div>
              <div className={styles["row"]}>
                <label htmlFor="user-password">비밀번호</label>
                <input
                  name="password"
                  id="user-password"
                  type="password"
                  onChange={loginInfoChange}
                  value={password}
                />
              </div>
              <button
                className={styles["login-btn"]}
                onClick={() => loginWithEmail()}
              >
                이메일로 로그인
              </button>
            </div>
          ) : (
            <div className={styles["body"]}>
              <p>
                블라인드 앱의 마이페이지 {`>`} 블라인드 웹 로그인 메뉴에서 아래
                생성된 일회용 인증 코드 8자리를 입력하시면 웹에서도 모든 기능을
                이용할 수 있습니다.
              </p>
              <div className={styles["info"]}>블라인드 OTP</div>
              <button className={styles["otp-btn"]}>U - 486 - 6259</button>
              <div className={styles["left-time"]}>
                남은 시간: {displayTime}
              </div>
            </div>
          )}
          {!loginModalState.directLogin && (
            <div className={styles["foot"]}>
              <a onClick={() => dispatch(loginDirectOpen())}>
                블라인드가 처음이신가요?
              </a>
            </div>
          )}
        </div>
      </div>
    )
  );
}
