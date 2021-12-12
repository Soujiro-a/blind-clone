const express = require("express");

const router = express.Router();
const { verify } = require("jsonwebtoken");
const { Article, Comment } = require("../../mongoose/model");

//  댓글 생성하기
router.post("/create", async (req, res) => {
  const { article, content } = req.body;
  const { authorization } = req.headers;

  if (!authorization) {
    return res.send({
      error: true,
      message: "토큰이 존재하지 않음",
    });
  }

  const token = authorization.split(" ")[1];
  const secret = req.app.get("jwt-secret");
  verify(token, secret, async (err, data) => {
    if (err) {
      return res.send(err);
    }

    const newComment = await Comment({
      author: data.id,
      article,
      content,
    }).save();

    await Article.findOneAndUpdate(
      { _id: article },
      {
        $inc: { commentCount: 1 },
      }
    );
    return res.send(!!newComment._id);
  });
  return null;
});

// 댓글 수정하기
router.patch("/", async (req, res) => {
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
router.delete("/hard", async (req, res) => {
  const { id, author } = req.body;
  const deletedComment = await Comment.deleteOne({
    _id: id,
    author,
  });

  res.send(deletedComment);
});

// 댓글 삭제하기(일반 사용자는 보지 못하는 상태. 일정 시간이 지나면 삭제될 상태)
router.delete("/soft", async (req, res) => {
  const { id, author } = req.body;
  const deletedComment = await Comment.findOneAndUpdate(
    {
      _id: id,
      author,
    },
    {
      deleteTeime: new Date.getTime() + 30 * 24 * 60 * 60 * 1000, // 30일 후의 시간이 저장
    }
  );

  res.send(deletedComment);
});

module.exports = router;
