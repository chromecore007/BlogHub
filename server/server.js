const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
const blogRoutes = require("./routes/blogRoutes");

app.use("/api/blog", blogRoutes);

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const commentRoutes = require("./routes/commentRoutes");
app.use("/api/comment", commentRoutes);


// test route
app.get("/", (req, res) => {
  res.send("Blog API is running 🚀");
});

// mongo connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

// server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
