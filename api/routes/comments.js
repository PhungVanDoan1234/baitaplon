const router = require("express").Router();
const Comment = require("../models/Comment");
const Post = require("../models/Post");

// create a comments
router.post("/", async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const saveCommet = await newComment.save();
    res.status(200).json(saveCommet);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a comments
router.put("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.userId === req.body.userId || req.body.isAdmin) {
      await comment.updateOne({ $set: req.body });
      res.status(200).json("the comment has been updated");
    } else {
      res.status(403).json("you can updated only your comments");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a comments
router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.userId === req.body.userId || req.body.isAdmin) {
      await comment.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only you comments");
    }
  } catch (error) {}
});

// get all comments of a post
router.get("/allComments/:id", async (req, res) => {
  try {
    const currentPost = await Post.findById(req.params.id);
    const comments = await Comment.find({ postId: currentPost._id });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
