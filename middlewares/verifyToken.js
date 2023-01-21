const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeaders = req.headers.token;

  if (authHeaders) {
    const token = authHeaders.split(' ')[1];
    jwt.verify(token, process.env.JWT_KEY, (err, data) => {
      if (err) {
        res.status(401).json({ message: 'token invalid' });
      } else {
        req.user = data;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No Token' });
  }
};

const verifyUserAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(401).json({ message: 'not authorized' });
    }
  });
};
const verifyCurrentUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.body.currentUser || req.user.isAdmin) {
      next();
    } else {
      res.status(401).json({ message: 'not authorized' });
    }
  });
};
const verifyUserIsAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(401).json({ message: 'you are not admin' });
    }
  });
};

module.exports = {
  verifyToken,
  verifyUserAuth,
  verifyUserIsAdmin,
  verifyCurrentUser,
};
