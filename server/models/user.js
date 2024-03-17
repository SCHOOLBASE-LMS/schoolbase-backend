const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    fullName: { type: "String", required: true },
    email: { type: "String", unique: true },
    password: { type: "String" },
  },
  { timestamps: true }
);

const User = mongoose.model("users", UserSchema);

module.exports = User;
