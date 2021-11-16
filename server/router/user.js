const express = require('express');

const router = express.Router();
const { User } = require('../mongoose/model');

// 로그인
// eslint-disable-next-line consistent-return
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const loginUser = await User.find({ email });
  // eslint-disable-next-line no-underscore-dangle
  if (!loginUser._id) {
    return res.send({
      error: true,
      message: '존재하지 않는 이메일',
    });
  }
  const correctPassword = await loginUser.authenticate(password);
  if (!correctPassword) {
    return res.send({
      error: true,
      message: '비밀번호 불일치',
    });
  }

  res.send({ email: loginUser.email, nickname: loginUser.nickname });
});

// 회원가입
router.post('/signup', async (req, res) => {
  const { nickname, company, email, password } = req.body;
  const newUser = await User({
    email,
    nickname,
    password,
    company,
  }).save();

  console.log(newUser);
  // eslint-disable-next-line no-underscore-dangle
  res.send(!!newUser._id);
});

module.exports = router;
