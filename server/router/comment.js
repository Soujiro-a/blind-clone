const express = require('express');

const router = express.Router();
const { Comment } = require('../mongoose/model');

//  댓글 생성하기
router.post('/create', async (req, res) => {
  const { author, article, content } = req.body;
  const newComment = await Comment({
    author,
    article,
    content,
  }).save();

  // eslint-disable-next-line no-underscore-dangle
  res.send(!!newComment._id);
});

// 댓글 수정하기
router.patch('/update', async (req, res) => {
  const { id, author, content } = req.body;
  const updatedComment = await Comment.findOneAndUpdate(
    {
      _id: id,
      author,
    },
    { content },
    {
      new: true,
    }
  );

  res.send(updatedComment);
});

// 댓글 완전 삭제하기(DB에서도 지워버림)
router.delete('/delete/hard', async (req, res) => {
  const { id, author } = req.body;
  const deletedComment = await Comment.deleteOne({
    _id: id,
    author,
  });

  res.send(deletedComment);
});

// 댓글 삭제하기(일반 사용자는 보지 못하는 상태. 일정 시간이 지나면 삭제될 상태)
router.delete('/delete/soft', async (req, res) => {
  const { id, author } = req.body;
  const deletedComment = await Comment.findOneAndUpdate(
    {
      _id: id,
      author,
    },
    {
      // eslint-disable-next-line new-cap
      deleteTeime: new Date.getTime() + 30 * 24 * 60 * 60 * 1000, // 30일 후의 시간이 저장
    }
  );

  res.send(deletedComment);
});

module.exports = router;
