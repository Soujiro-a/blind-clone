// @ts-check

/* eslint-disable no-prototype-builtins */
require('dotenv').config();
const mongoose = require('mongoose');

const schema = require('./schema');

const db = mongoose.connection;
const { MONGO_PASSWORD, MONGO_CLUSTER, MONGO_USER, MONGO_DBNAME } = process.env;
const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DBNAME}?retryWrites=true&w=majority`;
const model = (() => {
  // eslint-disable-next-line no-console
  db.on('error', console.error);
  db.on('open', () => {
    // eslint-disable-next-line no-console
    console.log('Connecting mongodb!');
  });

  // mongoDB 엑세스 주소
  mongoose.connect(MONGO_URI);

  // 스키마 연결
  const models = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const key in schema) {
    if (schema.hasOwnProperty(key)) {
      models[key] = mongoose.model(key, schema[key]);
    }
  }

  return models;
})();

module.exports = model;
