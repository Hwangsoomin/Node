import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  id: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
});

const refreshTokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema' },
  token: String,
  expires: Date,
  created: { type: Date, default: Date.now },
  revoked: Date,
  replacedByToken: String,
});

const User = new mongoose.model('User', userSchema);
const RefreshToken = new mongoose.model('RefreshToken', refreshTokenSchema);
export { User, RefreshToken };
