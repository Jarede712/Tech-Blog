const express = require("express");
const router = express.Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Route to post a new comment
router.post("/add", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      userId: req.session.userId,
      postId: req.body.postId,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(error);
  }
});

// Route to delete a comment\

router.delete("/delete/:id", withAuth, async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    });

    if (!deletedComment) {
      res.status(404).json({ message: "No comment found with this id" });
      return;
    }

    res.status(200).json(deletedComment);
  } catch (err) {
    res.status(500).json(error);
  }
});

module.exports = router;
