const express = require('express');

const router = express.Router();
const { Article, Comment } = require('../mongoose/model');

// 개별 게시글 가져오기
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const article = await Article.findById(id);
  const comment = await Comment.find({ article: id });
  res.send({ article, comment });
});

// 게시글 추가
router.post('/create', async (req, res) => {
  const { author, title, content, board } = req.body;
  const newArticle = await Article({
    author,
    title,
    content,
    board,
  }).save();

  res.send(newArticle);
});

// 게시글 수정
router.patch('/update', async (req, res) => {
  const { id, author, content } = req.body;
  const updatedArticle = await Article.findOneAndUpdate(
    {
      _id: id,
      author,
    },
    { content },
    {
      new: true,
    }
  );

  res.send(updatedArticle);
});

// 게시글 완전 삭제하기(DB에서도 지워버림)
router.delete('/delete/hard', async (req, res) => {
  const { id, author } = req.body;
  const deletedArticle = await Article.deleteOne({
    _id: id,
    author,
  });

  res.send(deletedArticle);
});

// 게시글 삭제하기(일반 사용자는 보지 못하는 상태. 일정 시간이 지나면 삭제될 상태)
router.delete('/delete/soft', async (req, res) => {
  const { id, author } = req.body;
  const deletedArticle = await Article.findOneAndUpdate(
    {
      _id: id,
      author,
    },
    {
      // eslint-disable-next-line new-cap
      deleteTeime: new Date.getTime() + 30 * 24 * 60 * 60 * 1000, // 30일 후의 시간이 저장
    }
  );

  res.send(deletedArticle);
});

module.exports = router;
