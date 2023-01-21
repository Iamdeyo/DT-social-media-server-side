const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      min: 1,
    },
    lastname: {
      type: String,
      min: 1,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      min: 4,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      min: 4,
    },
    password: {
      type: String,
      required: true,
      min: 4,
    },
    desc: {
      type: String,
      default: 'Hello I Am New Here',
      max: 500,
    },
    age: {
      type: Number,
      default: 0,
    },
    profilePics: {
      type: String,
      default: '',
    },
    coverPics: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    isDemo: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
