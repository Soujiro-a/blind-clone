const cookie = require("react-cookies");
const axios = require("axios");

export default function setToken(token) {
  axios.defaults.headers.Authorization = "Bearer " + token;

  const expires = new Date();
  expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 7);

  cookie.save("token", token, {
    path: "/",
    expires,
    httpOnly: false,
  });
}
