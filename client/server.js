require("dotenv").config();
const express = require("express");
const next = require("next");
const apiRouter = require("./server/apiRouter");
const cors = require("cors");

const dev = process.env.NODE_ENV !== "production"; //false => product, true => dev
const app = next({ dev });
const handle = app.getRequestHandler();

const SECRET = "N@1U!@*!0@N7$6N0&*&N!6(*AJE@J";

app.prepare().then(() => {
  const server = express();

  server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  // JWT 시크릿 설정
  server.set("jwt-secret", SECRET);

  server.use("/api", apiRouter);

  //필수항목!, pages폴더 아래 component들 pre- render
  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
