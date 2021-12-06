require("dotenv").config();
const express = require("express");
const next = require("next");
const apiRouter = require("./server/apiRouter");
const cors = require("cors");

const dev = true; //false => product, true => dev
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

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
