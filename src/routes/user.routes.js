const express = require('express');
const { registerUser, loginUser, logoutUser, deleteUser, getUsers, getUserByEmail } = require('../controllers/user.controller');
const { isAuth, isAdmin } = require('../middlewares/auth.middleware');
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", [isAuth], logoutUser);
userRouter.delete("/delete/:id", [isAdmin], deleteUser);
userRouter.get("/", getUsers);


module.exports = userRouter;