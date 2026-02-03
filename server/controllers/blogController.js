const Blog = require("../models/Blog");

// CREATE BLOG
exports.createBlog = async (req, res) => {
  try {
  const blogData = {
  ...req.body,
  author: req.user._id,   // 🔥 REAL USER
  image: req.file ? req.file.path : "",
};


    const blog = await Blog.create(blogData);

    res.status(201).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// GET ALL BLOGS
exports.getAllBlogs = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const keyword = req.query.search
      ? {
          title: {
            $regex: req.query.search,
            $options: "i",
          },
        }
      : {};

    const blogs = await Blog.find(keyword)
     .populate("author", "name") 
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Blog.countDocuments(keyword);

    res.status(200).json({
      blogs,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET SINGLE BLOG
exports.getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
  "author",
  "name email"
);

    if (!blog)
      return res.status(404).json({ success: false, message: "Blog not found" });

    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE BLOG
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // 🔐 AUTHOR CHECK
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to edit this post",
      });
    }

    blog.title = req.body.title || blog.title;
    blog.description = req.body.description || blog.description;
    blog.content = req.body.content || blog.content;

    // 🔥 IMAGE UPDATE (THIS WAS MISSING)
    if (req.file) {
      blog.image = req.file.path;
    }

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    console.error("UPDATE BLOG ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};



// DELETE BLOG
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // 🔐 AUTHOR CHECK
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to delete this post",
      });
    }

    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

