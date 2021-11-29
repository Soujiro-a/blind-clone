const {
  Schema,
  Types: { ObjectId },
} = require('mongoose');

const Comment = new Schema({
  author: { type: ObjectId, ref: 'User', required: true },
  article: { type: ObjectId, ref: 'Article' },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },

  // 동적으로 변동될 수 있는 데이터
  thumbupCount: { type: Number, default: 0 },
  replyCount: { type: Number, default: 0 },
  deleteTime: { type: Number, default: 0 },

  // 사용자가 게시글에 추가할 수 있는 데이터
  commentImgAddress: { type: String },
});

module.exports = Comment;
