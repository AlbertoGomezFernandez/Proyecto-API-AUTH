const express = require('express');
const Console = require('../models/console.model');
const { isAuth } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const consoles = await Console.find().populate("games");
    return res.status(200).json(consoles);
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (req, res, next) => {

  try {
    const newConsole = new Console({
      name: req.body.name,
      games: []
    });
    const existingConsole = await Console.findOne({ name: req.body.name });
    if (existingConsole) {
      throw new Error("Already exists");
    }
    const createdConsole = await newConsole.save();
    return res.status(201).json(createdConsole);
  } catch (error) {
    next(error);
  }
});


router.delete("/delete/:id", isAuth, async (req, res, next) => {
  try {
    const id = req.params.id;
    await Console.findByIdAndDelete(id);
    return res.status(200).json(`Console deleted!`);
  } catch (error) {
    next(error.message);
  }
});

module.exports = router;