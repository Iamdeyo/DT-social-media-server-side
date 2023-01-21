const router = require('express').Router();
const {
  createPost,
  updatePost,
  likePost,
  deletePost,
  getPost,
  getTimelinePost,
} = require('../controllers/post');
const {
  verifyCurrentUser,
  verifyUserAuth,
} = require('../middlewares/verifyToken');

// create post
router.post('/', verifyCurrentUser, createPost);
// update post
router.put('/:id', verifyCurrentUser, updatePost);
// Delete Post
router.delete('/:id', verifyCurrentUser, deletePost);

// like post and Unlike Post
router.put('/:id/like', verifyCurrentUser, likePost);

// get post
router.get('/:id', verifyUserAuth, getPost);
// get timeline post
router.get('/:id/timeline', verifyUserAuth, getTimelinePost);
// get only users post
router.get('/:id/user', verifyUserAuth, getTimelinePost);

module.exports = router;
