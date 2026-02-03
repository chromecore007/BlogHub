const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  addComment,
  getCommentsByBlog,
} = require("../controllers/commentController");

router.post("/:blogId", protect, addComment);
router.get("/:blogId", getCommentsByBlog);

module.exports = router;
