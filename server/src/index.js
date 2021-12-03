// @ts-check

/* eslint-disable no-console */

require('dotenv').config();
const fs = require('fs');
const AWS = require('aws-sdk');
const express = require('express');
const cors = require('cors');
const formidable = require('express-formidable');

const app = express();
const {
  article,
  board,
  company,
  comment,
  reply,
  search,
  user,
} = require('../router');

const PORT = 5000;
const SECRET = 'N@1U!@*!0@N7$6N0&*&N!6(*AJE@J';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// JWT 시크릿 설정
app.set('jwt-secret', SECRET);

// 기능별 라우터 추가
app.use('/article', article);
app.use('/board', board);
app.use('/comment', comment);
app.use('/company', company);
app.use('/reply', reply);
app.use('/search', search);
app.use('/user', user);

app.use(formidable());

// 상태 확인용 루트 라우트
app.get('/', (req, res) => {
  res.send(`Hello, Express!`);
});

app.post('/upload', (req, res) => {
  if (!req.files) {
    return res.send({ error: true, message: '파일이 첨부되지 않음' });
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
    ACL: 'public-read',
  };
  s3.upload(params, (err, data) => {
    if (err) {
      return res.send({ error: true, message: 'S3 에러' });
    }
    return res.send({ error: false, message: '성공', key: fileName });
  });
  return null;
});

app.listen(PORT, () => {
  console.log(`This Server is listening PORT:${PORT}`);
});
