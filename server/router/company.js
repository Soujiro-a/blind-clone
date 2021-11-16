const express = require('express');

const router = express.Router();
const { Company } = require('../mongoose/model');

// 회사 추가
router.post('/create', async (req, res) => {
  const { name } = req.body;
  const newCompany = await Company({
    name,
  }).save();

  console.log(newCompany);
  // eslint-disable-next-line no-underscore-dangle
  res.send(!!newCompany._id);
});

module.exports = router;
