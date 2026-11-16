const mongoose = require("mongoose");

const singerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  bio: String,
  photo: String,
});

module.exports = mongoose.model("Singer", singerSchema);