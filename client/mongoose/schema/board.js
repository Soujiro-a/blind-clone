const mongoose = require("mongoose");
const { Schema } = mongoose;

const Board = new Schema({
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.models.Board || mongoose.model("Board", Board);
