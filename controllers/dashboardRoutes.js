const express = require("express");
const router = express.Router();
const { Post } = require("../models");
const withAuth = require("../utils/auth");

// Route to display the dashboard with user's posts
router.get("/", withAuth, async (req, res) => {
  try {
    const userPostsData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const posts = userPostsData.map((post) => post.get({ plain: true }));

    res.render("dashboard", { posts, logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/new", withAuth, (req, res) => {
  res.render("create-post", { logged_in: req.session.logged_in });
});

module.exports = router;
