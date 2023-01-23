const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  roles: [String],
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  next();
});

userSchema.methods.checkPassword = async function (password) {
  try {
    const decodedPassword = await bcrypt.compare(password, this.password);
    return decodedPassword;
  } catch (e) {
    return false;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
