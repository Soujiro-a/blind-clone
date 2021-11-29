const express = require('express');

const router = express.Router();
const { Article } = require('../mongoose/model');

// 게시글 검색 결과를 반환
router.get('/:q', async (req, res) => {
  const { q } = req.params;
  const article = await Article.find({ title: { $regex: q } }).populate({
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
  res.send({ article: formatedArticle, error: false, message: '성공' });
});

module.exports = router;
