const router = require("express").Router();
const GroupMesage = require("../models/GroupMessage");

// Create Group
router.post("/createGroup", async (req, res) => {
  try {
    // create new group
    const newGroup = new GroupMesage({
      userId: req.body.userId,
      text: req.body.text,
    });

    // save uesr and respond
    const group = await newGroup.save();
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a Group
router.get("/:id", async (req, res) => {
  try {
    const group = await GroupMesage.findById(req.params.id);
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all Group
router.get("/", async (req, res) => {
  try {
    const group = await GroupMesage.find();
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json(err);
  }
});

// udpate group
router.put("/:id", async (req, res) => {
  try {
    const group = await GroupMesage.findById(req.params.id);
    const newGroup = req.body;
    if (group.userId === req.body.userId) {
      await group.updateOne({ $set: newGroup });
      res.status(200).json(newGroup);
    } else {
      res.status(403).json("you can't update if you aren't isAdminGroup");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete group
router.delete("/:id", async (req, res) => {
  const group = await GroupMesage.findById(req.params.id);
  try {
    if (group.userId === req.body.userId) {
      await group.deleteOne();
      res.status(200).json("the group has been deleted");
    } else {
      res.status(403).json("you can't delete if you aren't isAdminGroup");
    }
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
