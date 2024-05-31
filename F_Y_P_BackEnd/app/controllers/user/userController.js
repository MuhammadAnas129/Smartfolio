const bcrypt = require("bcryptjs");
var User = require("../../models/user");

const jwt = require('jsonwebtoken');
require('dotenv').config();

const signup = async (req, res) => {
  var data = {
    email: req.body.email,
    phoneNo: req.body.phoneNo,
    fullName: req.body.fullName,
    password: req.body.password,
  };
  try {
    if (!data.email || !data.password) {
      return res.json({
        status: false,
        message: 'email and password are required'
      })
    }
    const findUser = await User.find({ email: data.email })
    if (findUser.length > 0) {
      return res.json({
        status: false,
        message: 'user already exist'
      })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    data.password = hashedPassword;
    const user = await User(data);
    await user.save();
    res.json({
      status: true,
      message: 'Signup Successfull',
      result: user
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const login = async (req, res) => {
  var data = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    if (!data.email || !data.password) {
      return res.json({
        status: false,
        message: 'email and password are required'
      })
    }
    const findUser = await User.findOne({ email: data.email })
    if (!findUser) {
      return res.json({
        status: false,
        message: 'email does not exsists'
      })
    }
    const comparePassword = await bcrypt.compare(data.password, findUser.password)
    if (!comparePassword) {
      return res.json({
        status: false,
        message: 'password incorrect'
      })
    }
    res.json({
      status: true,
      message: 'Login Successfull',
      result: findUser
    })
  } catch (err) {
    console.log("Login error: ", err.message);
    res.status(500).json({ err: err.message });
  }
};
module.exports = {
  signup,
  login,
};
