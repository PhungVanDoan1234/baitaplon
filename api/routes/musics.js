const router = require("express").Router();
const Music = require("../models/Music");

// create a music
router.post("/", async (req, res) => {
  const newMusic = new Music(req.body);
  try {
    const saveMusic = await newMusic.save();
    res.status(200).json(saveMusic);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all music
router.get("/allMusic", async (req, res) => {
  try {
    const allMusic = await Music.find();
    res.status(200).json(allMusic);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update music
router.put("/:id", async (req, res) => {
  try {
    const music = await Music.findById(req.params.id);
    const newMusic = req.body;
    if (req.body.isAdmin === true) {
      await music.updateOne({ $set: newMusic });
      res.status(200).json("updated");
    } else {
      res.status(403).json("you aren't admin");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// detele music
router.delete("/:id", async (req, res) => {
  try {
    const music = await Music.findById(req.params.id);
    if (req.body.isAdmin === true) {
      await music.deleteOne();
      res.status(200).json("the music has been delete");
    } else {
      res.status(403).json("you aren't admin");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
