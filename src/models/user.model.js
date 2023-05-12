import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const userSchema = mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },

  userName: {
    type: String,
    required: true,
    immutable: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    immutable: true,
    lowerCase: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: () => Date.now(),
  },
});

userSchema.index({ email: 1 });

export const UserModel = mongoose.model('users', userSchema);
