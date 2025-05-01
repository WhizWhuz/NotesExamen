const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Notes must have a title."],
      maxlength: [50, "Title cannot be more than 50 words"],
    },
    content: {
      type: String,
      required: [true, "Notes cannot be empty."],
      maxlength: [250, "Notes cannot be more than 250 characters"],
    },
    tags: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    color: {
      type: String,
      default: "#F7C873",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Note", noteSchema);
