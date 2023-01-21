const {
  verifyToken,
  verifyUserAuth,
  verifyUserIsAdmin,
  verifyCurrentUser,
} = require('../middlewares/verifyToken');
const router = require('express').Router();
const User = require('../models/user');
const CryptoJS = require('crypto-js');
const {
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
  getUser,
  getSearchedUser,
} = require('../controllers/user');

// update user
router.put('/:id', verifyUserAuth, updateUser);

// delete user
router.delete('/:id', verifyUserAuth, deleteUser);

// follow user
router.put('/:id/following', verifyCurrentUser, followUser);

// unfollow
router.put('/:id/unfollow', verifyUserAuth, unfollowUser);

// get a user
router.get('/:id/user/:userId', verifyUserAuth, getUser);

// get searched users
router.get('/find', getSearchedUser);

module.exports = router;
