const User = require("../models/user.model");
const { verifyToken } = require("../utils/token");

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(400).json("Unauthorized 1");
  try {
    const decoded = verifyToken(token, process.env.JWT_KEY);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return res.status(400).json("Unauthorized 2");
  }
  // try {
  //   const token = req.headers.authorization;
  //   if (!token) {
  //     return res.status(400).json("Unauthorized 1");
  //   }
  //   const parsedToken = token.replace("Bearer ", "");
  //   const { id } = verifyToken(parsedToken);
  //   const user = await User.findById(id);

  //   user.password = null;
  //   req.user = user;
  //   next();

  // } catch (error) {
  //   return res.status(400).json("Unauthorized 2");
  // }
};

const isAdmin = async (req, res, next) => {

  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(400).json("Unauthorized 4");
  try {
    const decoded = verifyToken(token, process.env.JWT_KEY);
    const user = await User.findById(decoded.id);
    if (user.role === "admin") {
      user.password = null;
      req.user = user;
      next();
    } else {
      return res.status(400).json("Unauthorized you are not an admin");
    }

  } catch (error) {
    console.log(error);
    return res.status(400).json("Unauthorized 5");
  }
};

module.exports = { isAuth, isAdmin };