const express = require('express');

const router = express.Router();
const { Article, Board } = require('../mongoose/model');

//  게시판별 게시글 가져오기
// eslint-disable-next-line consistent-return
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  const { lastIndex } = req.query; // 무한 스크롤 구현 시 사용할 부분

  const board = await Board.findOne({ slug });
  // eslint-disable-next-line no-underscore-dangle
  if (!board._id) {
    return res.send({
      article: [],
      error: true,
      message: '존재하지 않는 게시판',
    });
  }
  // eslint-disable-next-line no-underscore-dangle
  const article = await Article.find({ board: board._id });
  res.send({ article, error: false, message: '성공' });
});

// 관리자: 게시판 추가
router.post('/create', async (req, res) => {
  const { title, slug } = req.body;
  const newBoard = await Board({
    title,
    slug,
  }).save();

  // eslint-disable-next-line no-underscore-dangle
  res.send(!!newBoard._id);
});

module.exports = router;
