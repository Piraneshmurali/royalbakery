const BlogPost = require("../models/BlogPost");
const cloudinary = require("../config/cloudinaryConfig");
const fs = require("fs");

// Create a new blog post
exports.createBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    // Use Cloudinary's direct upload URL
    const imageUrl = req.file.path;

    // Create a new blog post
    const blogPost = new BlogPost({
      title,
      content,
      imageUrl, // Cloudinary URL
    });

    await blogPost.save();

    res.status(201).json({ message: "Blog post created successfully", blogPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create blog post" });
  }
};


// Get all blog posts
exports.getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json(blogPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
};
