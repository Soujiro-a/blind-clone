import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import LoginModal from "./modal/Login";
import WritingModal from "./modal/Writing";

export default function GNB() {
  return (
    <nav>
      <div className="left-side">
        <Link to="/">
          <img src="../../public/main.png" alt="블라인드 로고" />
        </Link>
      </div>
      <div className="right-side">
        <LoginModal />
        <WritingModal />
      </div>
      <Routes>
        <Route path="/" />
      </Routes>
    </nav>
  );
}
