const express = require('express');

const router = express.Router();
const { Article, Board } = require('../mongoose/model');

//  메인에서 여러 게시판 글을 모아서 보여주기
router.get('/main', async (req, res) => {
  const board = await Board.find();
  if (!Array.isArray(board)) {
    return res.send({
      error: true,
      message: '게시판을 발견할 수 없음',
    });
  }

  const mainContent = [];
  Promise.all(
    board.map(async (b) => {
      // eslint-disable-next-line no-underscore-dangle
      const recentArticles = await Article.find({ board: b._id });
      if (!Array.isArray(recentArticles)) {
        return false;
      }
      mainContent.push({
        // eslint-disable-next-line no-underscore-dangle
        ...b._doc,
        content: recentArticles,
      });
      return null;
    })
  )
    .then(() => {
      res.send({
        content: mainContent.sort((a, b) => {
          // eslint-disable-next-line no-underscore-dangle
          if (a._id < b._id) {
            return -1;
          }
          // eslint-disable-next-line no-underscore-dangle
          if (a._id > b._id) {
            return 1;
          }
          return 0;
        }),
        error: false,
        message: '성공',
      });
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      res.send({ content: null, error: true, message: '서버 에러' });
    });
  return null;
});

// 게시판 목록 불러오기
router.get('/list', async (req, res) => {
  const board = await Board.find();
  res.send(board);
});

//  게시판별 게시글 가져오기
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

  const findOption = {
    // eslint-disable-next-line no-underscore-dangle
    board: board._id,
  };

  if (lastIndex !== undefined) {
    // eslint-disable-next-line no-underscore-dangle
    findOption._id = { $lt: lastIndex };
  }

  const article = await Article.find(findOption)
    .sort({ _id: -1 })
    .limit(6)
    .populate({
      path: 'author',
      populate: { path: 'company' },
    });

  const formatedArticle = article.map((a) => ({
    // eslint-disable-next-line no-underscore-dangle
    ...a._doc,
    author: {
      // eslint-disable-next-line no-underscore-dangle
      ...a._doc.author._doc,
      nickname:
        // eslint-disable-next-line no-underscore-dangle
        a._doc.author.nickname[0] +
        // eslint-disable-next-line no-underscore-dangle
        '*'.repeat(a._doc.author.nickname.length - 1),
    },
  }));
  return res.send({ article: formatedArticle, error: false, message: '성공' });
});

// 관리자: 게시판 추가
router.post('/create', async (req, res) => {
  const { title, slug } = req.body;
  const newBoard = await Board({
    title,
    slug,
  }).save();

  // eslint-disable-next-line no-underscore-dangle
  return res.send(!!newBoard._id);
});

module.exports = router;
