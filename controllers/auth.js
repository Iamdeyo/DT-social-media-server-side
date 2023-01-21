const User = require('../models/user');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const Register = async (req, res) => {
  if (req.body.password !== req.body.conPassword) {
    return res.status(500).json({ message: 'password not the same' });
  }
  const hashedPassword = await CryptoJS.AES.encrypt(
    req.body.password,
    process.env.PASS_KEY
  ).toString();

  const newUser = await new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email,
  });

  try {
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};
const Login = async (req, res) => {
  // const { username, password } = await req.body;

  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    if (user) {
      // check password
      const unhashedPassword = await CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_KEY
      ).toString(CryptoJS.enc.Utf8);
      if (unhashedPassword !== req.body.password) {
        return res.status(500).json({ message: 'invalid password' });
      }
      // create jwt token
      const token = await jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_KEY,
        { expiresIn: '3d' }
      );
      const { password, ...others } = user._doc;
      return res.status(200).json({ token, ...others });
    } else {
      return res.status(500).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'error' });
  }
};

module.exports = { Register, Login };
