const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  token: { type: String, required: true },
  // createdAtフィールドではexpiresを設定することで指定した時間経過後に削除することができます。
  // 60秒後に自動で削除されます。
  createdAt: { type: Date, default: Date.now, expires: 60 },
});

module.exports = mongoose.model("Token", TokenSchema);
