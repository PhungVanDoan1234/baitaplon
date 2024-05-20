const mongoose = require("mongoose");

const MusicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    singer: {
      type: String,
      required: true,
    },
    music: {
      type: String,
    },
    img: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Music", MusicSchema);
