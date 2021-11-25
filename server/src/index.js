// @ts-check

/* eslint-disable no-console */

const express = require('express');
const cors = require('cors');

const app = express();
const { article, board, company, comment, reply, user } = require('../router');

const PORT = 5000;
const SECRET = 'N@1U!@*!0@N7$6N0&*&N!6(*AJE@J';

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
app.use('/user', user);

// 상태 확인용 루트 라우트
app.use('/', (req, res) => {
  res.send(`Hello, Express!`);
});

app.listen(PORT, () => {
  console.log(`This Server is listening PORT:${PORT}`);
});
