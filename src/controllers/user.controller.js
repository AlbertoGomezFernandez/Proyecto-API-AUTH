const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");


const registerUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const userExist = await User.findOne({ email: user.email });
    if (userExist) return next(new Error('User already exists'));

    const userSaved = await user.save();
    return res.status(201).json(userSaved);
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateToken(user);
        return res.status(200).json(`You have logged in your token is ${token}`);
      }
    } else { return res.status(200).json("The email or password is incorrect"); }

  } catch (error) {
    return next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    const token = null;
    return res.status(200).json("You logged out");
  } catch (error) {
    return next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getUserByEmail = async (req, res, next) => {
  try {
    const email = req.params.email;
    const users = await User.find({ email });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);
    return res.status(200).json(`User: ${deletedUser.userName} has been deleted`);
  } catch (error) {
    return res.status(400).json(error);
  }

};



module.exports = { registerUser, loginUser, logoutUser, deleteUser, getUsers, getUserByEmail };