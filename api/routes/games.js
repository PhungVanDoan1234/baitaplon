const router = require("express").Router();
const Game = require("../models/Game");

// create a game
router.post("/", async (req, res) => {
  const newGame = new Game(req.body);
  try {
    const saveGame = await newGame.save();
    res.status(200).json(saveGame);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all game
router.get("/allGame", async (req, res) => {
  try {
    const allGame = await Game.find();
    res.status(200).json(allGame);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update game
router.put("/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    const newGame = req.body;
    if (req.body.isAdmin === true) {
      await game.updateOne({ $set: newGame });
      res.status(200).json("updated success");
    } else {
      res.status(403).json("you aren't admin");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// deleteGame
router.delete("/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (req.body.isAdmin === true) {
      await game.deleteOne();
      res.status(200).json("the game has been delete");
    } else {
      res.status(403).json("you aren't admin");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
