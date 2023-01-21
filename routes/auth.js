const router = require('express').Router();
const { Login, Register } = require('../controllers/auth');

router.post('/register', Register);
router.post('/login', Login);

module.exports = router;
