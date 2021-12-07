const express = require("express");

const router = express.Router();
const { Article } = require("../../mongoose/model");

// 게시글 검색 결과를 반환
router.get("/:q", async (req, res) => {
  const { q } = req.params;
  const { lastIndex } = req.query; // 무한 스크롤 구현 시 사용할 부분

  const findOption = {
    title: { $regex: q },
  };

  if (lastIndex !== undefined) {
    findOption._id = { $lt: lastIndex };
  }

  const article = await Article.find(findOption)
    .sort({ _id: -1 })
    .limit(6)
    .populate({
      path: "author",
      populate: { path: "company" },
    });

  const formatedArticle = article.map((a) => ({
    ...a._doc,
    author: {
      ...a._doc.author._doc,
      nickname:
        a._doc.author.nickname[0] +
        "*".repeat(a._doc.author.nickname.length - 1),
    },
  }));
  res.send({ article: formatedArticle, error: false, message: "성공" });
});

module.exports = router;
