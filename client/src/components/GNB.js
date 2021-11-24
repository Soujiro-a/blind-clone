import LoginModal from "./Modal/Login";
import WritingModal from "./Modal/Writing";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../../public/images/blind.png";
import SmallSearchbar from "./GNB/SmallSearchbar";
import { useDispatch, useSelector } from "react-redux";
import { loginOpen } from "../store/reducers/modal";

export default function GNB() {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.user);

  function clickWritingButton() {
    if (!loginState.email) {
      dispatch(loginOpen());
    }
  }

  function clickLoginButton() {
    if (!loginState.email) {
      dispatch(loginOpen());
    }
  }
  return (
    <nav>
      <div className="left-side">
        <Link href="/" passHref>
          <a>
            <Image src={logoImg} alt="블라인드 로고" />
          </a>
        </Link>
        <Link href="/" passHref>
          <a>홈</a>
        </Link>
        <Link href="/company" passHref>
          <a>기업 리뷰</a>
        </Link>
      </div>
      <div className="right-side">
        <SmallSearchbar />
        <a onClick={() => clickWritingButton()}>글쓰기</a>
        <a onClick={() => clickLoginButton()}>
          {loginState.email ? "로그아웃" : "로그인"}
        </a>
      </div>
      <LoginModal />
      {/* <WritingModal /> */}
    </nav>
  );
}
