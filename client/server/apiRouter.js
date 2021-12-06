const express = require("express");
const fs = require("fs");
const AWS = require("aws-sdk");
const formidable = require("express-formidable");

const app = express();
const router = express.Router();
const {
  article,
  board,
  company,
  comment,
  reply,
  search,
  user,
} = require("./router");

const SECRET = "N@1U!@*!0@N7$6N0&*&N!6(*AJE@J";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// JWT 시크릿 설정
app.set("jwt-secret", SECRET);

// 기능별 라우터 추가
router.use("/article", article);
router.use("/board", board);
router.use("/comment", comment);
router.use("/company", company);
router.use("/reply", reply);
router.use("/search", search);
router.use("/user", user);

router.use(formidable());

// 상태 확인용 루트 라우트
router.get("/", (req, res) => {
  res.send(`Hello, Express! API Route`);
});

router.post("/upload", (req, res) => {
  if (!req.files) {
    return res.send({ error: true, message: "파일이 첨부되지 않음" });
  }

  const raw = req.files.file;
  // @ts-ignore
  const buffer = fs.readFileSync(raw.path);
  const fileName = new Date().getTime() + raw.name;
  const params = {
    Body: buffer,
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    // @ts-ignore
    Key: fileName,
    ACL: "public-read",
  };
  s3.upload(params, (err, data) => {
    if (err) {
      return res.send({ error: true, message: "S3 에러" });
    }
    return res.send({ error: false, message: "성공", key: fileName });
  });
  return null;
});

module.exports = router;
