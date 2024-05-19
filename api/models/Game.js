const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema(
  {
    idGame: {
      type: String,
      required: true,
      unique: true,
    },
    nameGame: {
      type: String,
      required: true,
    },
    target: {
      type: String,
    },
    handle: {
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

module.exports = mongoose.model("Game", GameSchema);
