import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginClose } from "../../store/modules/modal";

export default function GNB() {
  const dispatch = useDispatch();
  const loginModalState = useSelector((state) => state.modal.login);
  return loginModalState.show ? (
    <div className="modal-outside">
      <div id="login-modal">
        <div className="head">
          <h5>블라인드 OTP 안전 인증</h5>
          <a
            onClick={() => {
              dispatch(loginClose);
            }}
            className="close-btn"
          >
            <img src alt />
          </a>
        </div>
      </div>
    </div>
  ) : null;
}
