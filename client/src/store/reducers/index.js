import { combineReducers } from "redux";
import modal from "./modal";
import user from "./user";

const rootReducer = combineReducers({
  modal,
  user,
});

export default rootReducer;
