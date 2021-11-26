const express = require('express');

const router = express.Router();
const { Company } = require('../mongoose/model');

// 회사 추가
router.post('/create', async (req, res) => {
  const { name } = req.body;
  const newCompany = await Company({
    name,
  }).save();
  // eslint-disable-next-line no-underscore-dangle
  res.send(!!newCompany._id);
});

// 인기있는 회사 목록 불러오기
router.get('/list/famous', async (req, res) => {
  const company = await Company.find().limit(10).sort({ realtimeScore: -1 });

  return res.send(company);
});

module.exports = router;
