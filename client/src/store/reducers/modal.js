import { HYDRATE } from "next-redux-wrapper";

// 액션 타입
const LOGIN_OPEN = "modal/OPEN";
const LOGIN_DIRECT_OPEN = "modal/DIRECT_OPEN";
const LOGIN_CLOSE = "modal/CLOSE";

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

// 초기 상태
const initState = {
  login: { show: false, directLogin: false },
};

// 리듀서
export default function modal(state = initState, action) {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };
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
    default:
      return state;
  }
}
