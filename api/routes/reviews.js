const router = require("express").Router();
const Review = require("../models/Review");

// create a review
router.post("/", async (req, res) => {
  const newReview = new Review(req.body);
  try {
    const saveReview = await newReview.save();
    res.status(200).json(saveReview);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update review
router.put("/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    const newReview = req.body;
    if (req.body.isAdmin === true || review.userId === req.body.userId) {
      await review.updateOne({ $set: newReview });
      res.status(200).json(review);
    } else {
      res.status(403).json("you can update only your review");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all review
router.get("/getAllReview", async (req, res) => {
  try {
    const allReview = await Review.find();
    res.status(200).json(allReview);
  } catch (err) {
    res.status(500).json(err);
  }
});

// like / dislike review
router.put("/:id/like", async (req, res) => {
  try {
    const reviews = await Review.findById(req.params.id);
    if (!reviews.likeReview.includes(req.body.userId)) {
      await reviews.updateOne({ $push: { likeReview: req.body.userId } });
      res.status(200).json("the review has been liked");
    } else {
      await reviews.updateOne({ $pull: { likeReview: req.body.userId } });
      res.status(200).json("the review has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// deleteReview
router.delete("/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (req.body.isAdmin === true || review.userId === req.body.userId) {
      await review.deleteOne();
      res.status(200).json("the review has been deleted");
    } else {
      res.status(403).json("you can delete only your review");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
