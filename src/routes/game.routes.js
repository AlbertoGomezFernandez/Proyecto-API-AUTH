const express = require("express");
const Game = require("../models/game.model");
const { isAuth } = require("../middlewares/auth.middleware");
const router = express.Router();



router.get("/", async (req, res) => {
  try {
    const games = await Game.find();
    return res.status(200).json(games);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const newGame = new Game({
      name: req.body.name,
      console: req.body.console,
      usersThatPlay: []
    });
    const existingGame = await Game.findOne({ name: req.body.name });
    if (existingGame) {
      throw new Error("Already exists");
    }
    const createdGame = await newGame.save();
    return res.status(201).json(createdGame);
  } catch (error) {
    next(error);
  }
});

router.put("/add-user", async (req, res, next) => {
  try {
    const { gameId } = req.body;
    const { userId } = req.body;
    const updateGame = await Game.findByIdAndUpdate(
      gameId, { $push: { usersThatPlay: userId } },
      { new: true }
    );
    return res.status(200).json(updateGame);
  } catch (error) {
    return next(error);
  }
});

router.delete("/delete/:id", [isAuth], async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedGame = await Game.findByIdAndDelete(id);
    return res.status(200).json(`Game ${deletedGame.name} deleted`);
  } catch (error) {
    return next(error);
  }
});


module.exports = router;