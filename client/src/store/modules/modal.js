import { HYDRATE } from "next-redux-wrapper";

// 액션 타입
const LOGIN_OPEN = "modal/OPEN";
const LOGIN_DIRECT_OPEN = "modal/DIRECT_OPEN";
const LOGIN_CLOSE = "modal/CLOSE";
const WRITING = "modal/WRITING";

// 액션 생성 함수
export function loginOpen() {
  return {
    type: LOGIN_OPEN,
  };
}

export function loginDirectOpen() {
  return {
    type: LOGIN_DIRECT_OPEN,
  };
}

export function loginClose() {
  return {
    type: LOGIN_CLOSE,
  };
}

export function writing(display) {
  return {
    type: WRITING,
    display,
  };
}

// 초기 상태
const initState = {
  login: { show: false, directLogin: false },
  writing: false,
};

// 리듀서
export default function modal(state = initState, action) {
  switch (action.type) {
    case HYDRATE:
      return Object.assign({}, state, {
        email: action.payload.modal.email,
        nickname: action.payload.modal.nickname,
      });
    case LOGIN_OPEN:
      return Object.assign({}, state, {
        login: { show: true, directLogin: false },
      });
    case LOGIN_DIRECT_OPEN:
      return Object.assign({}, state, {
        login: { show: true, directLogin: true },
      });
    case LOGIN_CLOSE:
      return Object.assign({}, state, {
        login: { show: false, directLogin: false },
      });
    case WRITING:
      return Object.assign({}, state, {
        writing: action.display,
      });
    default:
      return state;
  }
}
