const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  singer: { type: mongoose.Schema.Types.ObjectId, ref: "Singer", required: true },
  album: String,
  duration: Number,
  cover: String,
  sourceUrl: String,
  tags: [String],
  plays: { type: Number, default: 0 },
});

module.exports = mongoose.model("Song", songSchema);