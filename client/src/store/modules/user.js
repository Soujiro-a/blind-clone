import { HYDRATE } from "next-redux-wrapper";

// 액션 타입
const SET_USER = "user/SET";

// 액션 생성 함수
export function setUser(payload) {
  return {
    type: SET_USER,
    payload,
  };
}

// 초기 상태
const initState = {
  email: null,
  nickname: null,
};

// 리듀서
export default function user(state = initState, action) {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };
    case SET_USER:
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
      } else {
        localStorage.removeItem("token");
      }
      return Object.assign({}, state, {
        email: action.payload.email,
        nickname: action.payload.nickname,
      });
    default:
      return state;
  }
}
