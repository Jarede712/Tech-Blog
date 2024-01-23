const express = require("express");
const router = express.Router();

const userRoutes = require("./api/userRoutes");
const commentsRoutes = require("./api/commentsRoutes");
const postRoutes = require("./api/postRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const homeRoutes = require("./homeRoutes");

router.use("/api/users", userRoutes);
router.use("/comments", commentsRoutes);
router.use("/posts", postRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/", homeRoutes);

module.exports = router;
