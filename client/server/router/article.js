const express = require("express");

const router = express.Router();
const { verify } = require("jsonwebtoken");
const { Article, Comment, Reply } = require("../../mongoose/model");

// 개별 게시글 가져오기
router.get("/:key", async (req, res) => {
  const { key } = req.params;
  const article = await Article.findOneAndUpdate(
    { key },
    { $inc: { viewCount: 1 } },
    { new: true }
  )
    .populate({
      path: "author",
      populate: { path: "company" },
    })
    .populate({
      path: "board",
    });

  const commentList = await Comment.find({ article: article._id }).populate({
    path: "author",
    populate: { path: "company" },
  });

  Promise.all(
    commentList.map(async (c) => {
      const replies = await Reply.find({ comment: c._doc._id }).populate({
        path: "author",
        populate: { path: "company" },
      });
      return {
        ...c._doc,
        author: {
          ...c._doc.author._doc,
          nickname: `${c._doc.author._doc.nickname[0]}${"*".repeat(
            c._doc.author._doc.nickname.length - 1
          )}`,
        },
        replies: replies.map((r) => ({
          ...r._doc,
          author: {
            ...r._doc.author._doc,
            nickname: `${r._doc.author._doc.nickname[0]}${"*".repeat(
              r._doc.author._doc.nickname.length - 1
            )}`,
          },
        })),
      };
    })
  )
    .then((comment) => {
      res.send({
        article: {
          ...article._doc,
          author: {
            ...article._doc.author._doc,
            nickname: `${article._doc.author._doc.nickname[0]}${"*".repeat(
              article._doc.author._doc.nickname.length - 1
            )}`,
          },
        },
        comment,
      });
    })
    .catch(() => {});
});

// 게시글 추가
router.post("/create", async (req, res) => {
  const { title, content, board, image } = req.body;
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
    const payload = {
      author: data.id,
      title,
      content,
      board,
      articleImgAddress: image,
    };
    const newArticle = await Article(payload).save();

    return res.send(newArticle);
  });
  return null;
});

// 게시글 수정
router.patch("/", async (req, res) => {
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
router.delete("/hard", async (req, res) => {
  const { id, author } = req.body;
  const deletedArticle = await Article.deleteOne({
    _id: id,
    author,
  });

  res.send(deletedArticle);
});

// 게시글 삭제하기(일반 사용자는 보지 못하는 상태. 일정 시간이 지나면 삭제될 상태)
router.delete("/soft", async (req, res) => {
  const { id, author } = req.body;
  const deletedArticle = await Article.findOneAndUpdate(
    {
      _id: id,
      author,
    },
    {
      deleteTeime: new Date.getTime() + 30 * 24 * 60 * 60 * 1000, // 30일 후의 시간이 저장
    },
    { new: true }
  );

  res.send(deletedArticle);
});

module.exports = router;
