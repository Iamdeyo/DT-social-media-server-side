const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    userPics: {
      type: String,
      required: true,
    },
    userFname: {
      type: String,
      required: true,
    },
    userLname: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 1000,
    },
    postImg: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;
