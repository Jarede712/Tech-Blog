const express = require("express");
const router = express.Router();
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const withAuth = require("../../utils/auth");

router.get("/signup", (req, res) => {
  res.render("signup");
});

// Route to register a new user
router.post("/signup", async (req, res) => {
  try {
    // Check if a user with the given email already exists
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const newUser = await User.create({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    });

    req.session
      .save(() => {
        req.session.userId = newUser.id;
        req.session.logged_in = true;

        return res.status(200).json(newUser);
      })
      .catch((err) => {
        console.log(err); // Log any errors that occur when saving the session
        return res.status(500).json(err);
      });
  } catch (err) {
    console.log(err); // Log any errors that occur when creating the user
    return res.status(400).json(err);
  }
});

// Route to login a user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.logged_in = true;

      res.json({ user, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to logout a user
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
