const { Schema, model } = require('mongoose');

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
userSchema.pre('save', async function (index) {
  const user = this;
  if (!User.isModified('password')) return next();
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
  next();
});

const User = model('User', userSchema);
module.exports = User;
