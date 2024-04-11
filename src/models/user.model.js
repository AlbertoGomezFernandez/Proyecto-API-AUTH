const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, trim: true, required: true, unique: true, validate: [validator.isEmail, "Email is not valid"] },
    userName: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true, minlength: [6, "Password is 6 characters minimum"] },
    bithdate: { type: Number, trim: true, required: true },
    role: { type: String, trim: true, required: true },
    profileImg: { type: String, trim: true, required: true }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function () {
  try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    console.log(error.message);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;