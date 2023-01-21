const User = require('../models/user');
const CryptoJS = require('crypto-js');

const updateUser = async (req, res) => {
  if (req.body.password) {
    const hashedPassword = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_KEY
    ).toString();
    req.body.password = hashedPassword;
  }

  try {
    const upadateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ message: 'account updated' });
  } catch (err) {
    res.status(500).json(err);
  }
};
const deleteUser = async (req, res) => {
  try {
    const upadateUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'user deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
};

const followUser = async (req, res) => {
  if (req.body.user === req.body.currentUser) {
    res.status(403).json({ message: 'you cant follow yourself' });
  } else {
    try {
      const user = await User.findById(req.body.user);
      const currentUser = await User.findById(req.body.currentUser);
      if (user.followers.includes(req.body.currentUser)) {
        // res.status(403).json({ message: 'Already followed' });
        try {
          await currentUser.updateOne({
            $pull: { following: req.body.user },
          });
          await user.updateOne({
            $pull: { followers: req.body.currentUser },
          });

          res.status(200).json({ message: 'unfollowed successfully' });
        } catch (err) {
          res.status(500).json({ message: 'failed' });
        }
      } else {
        try {
          await currentUser.updateOne({
            $push: { following: req.body.user },
          });
          await user.updateOne({
            $push: { followers: req.body.currentUser },
          });

          res.status(200).json({ message: 'followed successfully' });
        } catch (err) {
          res.status(500).json({ message: 'failed' });
        }
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

const unfollowUser = async (req, res) => {
  if (req.params.id === req.body.currentUser) {
    res.status(403).json({ message: 'you cant unfollow yourself' });
  } else {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.currentUser);

      if (!user.followers.includes(req.body.currentUser)) {
        res.status(403).json({ message: 'not followed' });
      } else {
        try {
          await currentUser.updateOne({
            $pull: { following: req.params.id },
          });
          await user.updateOne({
            $pull: { followers: req.body.currentUser },
          });

          res.status(200).json({ message: 'unfollowed successfully' });
        } catch (err) {
          res.status(500).json({ message: 'failed' });
        }
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

// Get a user
const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get Searched users
const getSearchedUser = async (req, res) => {
  const searchedQuery = new RegExp(req.query.name, 'i');
  try {
    const user = await User.find({
      $or: [
        { firstname: searchedQuery },
        { lastname: searchedQuery },
        { username: searchedQuery },
      ],
    });
    // const { password, ...others } = user._doc;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
  getUser,
  getSearchedUser,
};
