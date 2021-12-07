const cookie = require("react-cookies");
const axios = require("axios");
import { useDispatch } from "react-redux";
import { setUser } from "../src/store/modules/user";

export function setToken(token) {
  const expires = new Date();
  expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 7);

  cookie.save("token", token, {
    path: "/",
    expires,
    httpOnly: false,
  });
}

export function removeToken() {
  cookie.remove("token", { path: "/", expires: -1 });
}
