const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const {
  Schema,
  Types: { ObjectId },
} = mongoose;

const Article = new Schema({
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  board: { type: ObjectId, ref: 'Board', required: true },

  // 동적으로 변동될 수 있는 데이터
  viewCount: { type: Number, default: 0 },
  thumbupCount: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },

  // 사용자가 게시글에 추가할 수 있는 데이터
  articleImgAddress: { type: String },
  mention: { type: ObjectId, ref: 'User' },
});

Article.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = Article;
