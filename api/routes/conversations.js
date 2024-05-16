const router = require("express").Router();
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

// new conv
router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedCoversation = await newConversation.save();
    res.status(200).json(savedCoversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv of a user
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete conv of a user
router.delete("/delete/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Xóa tất cả các cuộc trò chuyện mà người dùng đã tham gia
    await Conversation.deleteMany({ members: { $in: [userId] } });

    res.status(200).json("Conversations deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/delete/:firstUserId/:secondUserId", async (req, res) => {
  try {
    // Xóa cuộc hội thoại giữa hai người dùng từ cả hai phía
    await Conversation.deleteOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json("Conversation deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv include two userId
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      $all: [req.params.firstUserId, req.params.secondUserId],
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
