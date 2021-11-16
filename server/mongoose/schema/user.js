const { Schema } = require('mongoose');

const User = new Schema({
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  nickname: { type: String, required: true, unique: true },
});

module.exports = User;
