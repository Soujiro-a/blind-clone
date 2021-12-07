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
  token: null,
};

// 리듀서
export default function user(state = initState, action) {
  switch (action.type) {
    case HYDRATE:
      return Object.assign({}, state, {
        email: action.payload.user.email,
        nickname: action.payload.user.nickname,
        token: action.payload.user.token,
      });
    case SET_USER:
      return Object.assign({}, state, {
        email: action.payload.email,
        nickname: action.payload.nickname,
        token: action.payload.token,
      });
    default:
      return state;
  }
}
