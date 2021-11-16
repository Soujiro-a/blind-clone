// @ts-check

/* eslint-disable no-console */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res) => {
  res.send(`Hello, Express!`);
});

app.listen(PORT, () => {
  console.log(`This Server is listening PORT:${PORT}`);
});
