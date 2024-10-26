const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const mongoose = require('mongoose');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: 'user',
  },
  profileImage: String,
  bio: { type: String, maxlength: 200 },
  profession: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// hashing password
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  const hashedPassword = await bcrypt.hash(this.password, 10);
  user.password = hashedPassword;
  next();
});

// match password
userSchema.methods.comparePassword = function (cadidatePassword) {
  return bcrypt.compare(cadidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
