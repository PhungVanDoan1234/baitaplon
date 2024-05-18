const mongoose = require("mongoose");

const CalendarSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Calendar", CalendarSchema);
