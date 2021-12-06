const mongoose = require("mongoose");
const {
  Schema,
  Types: { ObjectId },
} = mongoose;
const crypto = require("crypto");

const User = new Schema({
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  salt: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  nickname: { type: String, required: true, unique: true },
  company: { type: ObjectId, ref: "Company" },
});

// password는 가상 선택자
User.virtual("password").set(function (password) {
  // eslint-disable-next-line no-underscore-dangle
  this._password = password;
  this.salt = this.makeSalt();
  this.hashedPassword = this.encryptPassword(password);
});

// Salt 생성 함수
User.method(
  "makeSalt",
  () => `${Math.round(new Date().valueOf() * Math.random())}Blind Clone`
);

// 해시된 비밀번호 생성 함수
User.method("encryptPassword", function (plainPassword) {
  return crypto
    .createHmac("sha256", this.salt)
    .update(plainPassword)
    .digest("hex");
});

// 사용자 인증 함수
User.method("authenticate", function (plainPassword) {
  const inputPassword = this.encryptPassword(plainPassword);
  return inputPassword === this.hashedPassword;
});

module.exports = mongoose.models.User || mongoose.model("User", User);
