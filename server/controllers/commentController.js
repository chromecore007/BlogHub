const Comment = require("../models/Comment");

// ADD COMMENT
exports.addComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      text: req.body.text,
      blog: req.params.blogId,
      user: req.user._id,
    });

    res.status(201).json({ success: true, comment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET COMMENTS BY BLOG
exports.getCommentsByBlog = async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, comments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
