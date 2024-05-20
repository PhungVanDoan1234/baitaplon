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

// update game
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

module.exports = router;
