const User = require('../models/user');
const Post = require('../models/post');
const { all } = require('../routes/auth');

const createPost = async (req, res) => {
  const newPost = new Post(req.body);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updatePost = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ message: 'post updated' });
  } catch (err) {
    res.status(500).json(err);
  }
};
const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'post deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    if (!post.likes.includes(req.body.currentUser)) {
      //like
      await post.updateOne({ $push: { likes: req.body.currentUser } });
      res.status(200).json({ message: 'post liked' });
    } else {
      // unlike
      await post.updateOne({ $pull: { likes: req.body.currentUser } });
      res.status(200).json({ message: 'post unliked' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    if (!post) {
      return res.status(404).json({ message: 'post not found' });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getTimelinePost = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const userPost = await Post.find({ userID: user._id });
    const followingsPost = await Promise.all(
      user.following.map((follows) => {
        return Post.find({ userID: follows });
      })
    );
    res.status(200).json(userPost.concat(...followingsPost));
  } catch (err) {
    res.status(500).json(err);
  }
};
const getAllUserPost = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const userPost = await Post.find({ userID: user._id });
    res.status(200).json(userPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  getTimelinePost,
  getAllUserPost,
};
