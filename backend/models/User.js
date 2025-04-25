const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "User must input an email"],
      unique: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please provide a valid email!"],
    },
    password: {
      type: String,
      required: [true, "User must have a password."],
      minlength: 6,
    },
    name: {
      type: String,
      default: "Anonymous",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
