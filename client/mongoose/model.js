require("dotenv").config();
const mongoose = require("mongoose");

const schema = require("./schema");

const db = mongoose.connection;
(() => {
  db.on("error", console.error);
  db.on("open", () => {
    console.log("Connecting mongodb!");
  });

  mongoose.connect(process.env.mongodbUrl);
})();

module.exports = schema;
