import LoginModal from "./Modal/Login";
import WritingModal from "./Modal/Writing";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import logoImg from "../../public/images/blind.png";
import SmallSearchbar from "./GNB/SmallSearchbar";
import { useDispatch, useSelector } from "react-redux";
import { loginOpen, writing } from "../store/reducers/modal";
import { setUser } from "../store/reducers/user";
import styles from "../../styles/components/GNB.module.css";
import classNames from "classnames";

export default function GNB() {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.user);
  const router = useRouter();
  const { pathname } = router;

  function clickWritingButton() {
    if (!loginState.email) {
      dispatch(loginOpen());
    }
    dispatch(writing(true));
  }

  function clickLoginButton() {
    if (!loginState.email) {
      dispatch(loginOpen());
      return;
    }
    logout();
  }

  function logout() {
    dispatch(setUser({ email: null, nickname: null }));
  }
  return (
    <div className={styles["nav-container"]}>
      <nav className={styles["nav"]}>
        <div className={styles["side-block"]}>
          <Link href="/" passHref>
            <a className={styles["logo-btn"]}>
              <Image src={logoImg} alt="블라인드 로고" />
            </a>
          </Link>
          <Link href="/" passHref>
            <a
              className={classNames({
                [styles["text-menu"]]: true,
                [styles["active"]]: pathname === "/",
              })}
            >
              홈
            </a>
          </Link>
          <Link href="/company" passHref>
            <a
              className={classNames({
                [styles["text-menu"]]: true,
                [styles["active"]]: pathname === "/company",
              })}
            >
              기업 리뷰
            </a>
          </Link>
        </div>
        <div className={styles["side-block"]}>
          <SmallSearchbar />
          <a
            onClick={() => clickWritingButton()}
            className={styles["write-btn"]}
          >
            글쓰기
          </a>
          <a onClick={() => clickLoginButton()} className={styles["login-btn"]}>
            {loginState.email ? "로그아웃" : "로그인"}
          </a>
        </div>
        <LoginModal />
        <WritingModal />
      </nav>
    </div>
  );
}
