const upload = require("../middleware/uploadMiddleware");
const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// PROTECTED
router.post("/create", protect, upload.single("image"), createBlog);
router.put("/:id", protect, upload.single("image"), updateBlog);
router.delete("/:id", protect, deleteBlog);

// PUBLIC
router.get("/all", getAllBlogs);
router.get("/:id", getSingleBlog);

module.exports = router;
