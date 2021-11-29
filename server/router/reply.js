const express = require('express');

const router = express.Router();
const { verify } = require('jsonwebtoken');
const { Comment, Reply } = require('../mongoose/model');

//  대댓글 생성하기
router.post('/create', async (req, res) => {
  const { comment, content } = req.body;
  const { authorization } = req.headers;
  if (!authorization) {
    return res.send({
      error: true,
      message: '토큰이 존재하지 않음',
    });
  }

  const token = authorization.split(' ')[1];
  const secret = req.app.get('jwt-secret');
  verify(token, secret, async (err, data) => {
    if (err) {
      return res.send(err);
    }
    const newReply = await Reply({
      author: data.id,
      comment,
      content,
    }).save();

    await Comment.findOneAndUpdate(
      { _id: comment },
      {
        $inc: { replyCount: 1 },
      }
    );

    // eslint-disable-next-line no-underscore-dangle
    return res.send(!!newReply._id);
  });
  return null;
});

// 대댓글 수정하기
router.patch('/update', async (req, res) => {
  const { id, author, content } = req.body;
  const updatedReply = await Reply.findOneAndUpdate(
    {
      _id: id,
      author,
    },
    { content },
    {
      new: true,
    }
  );

  res.send(updatedReply);
});

// 대댓글 완전 삭제하기(DB에서도 지워버림)
router.delete('/delete/hard', async (req, res) => {
  const { id, author } = req.body;
  const deletedReply = await Reply.deleteOne({
    _id: id,
    author,
  });

  res.send(deletedReply);
});

// 대댓글 삭제하기(일반 사용자는 보지 못하는 상태. 일정 시간이 지나면 삭제될 상태)
router.delete('/delete/soft', async (req, res) => {
  const { id, author } = req.body;
  const deletedReply = await Reply.findOneAndUpdate(
    {
      _id: id,
      author,
    },
    {
      // eslint-disable-next-line new-cap
      deleteTeime: new Date.getTime() + 30 * 24 * 60 * 60 * 1000, // 30일 후의 시간이 저장
    }
  );

  res.send(deletedReply);
});

module.exports = router;
