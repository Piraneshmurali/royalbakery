const express = require("express");
const multer = require("multer");
const { createBlogPost, getAllBlogPosts } = require("../controllers/blogController");
const cloudinary = require("../config/cloudinaryConfig");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const router = express.Router();

// Configure Multer to Upload Directly to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog-images", // Cloudinary folder name
    format: async (req, file) => "jpg", // Convert all images to JPG
    public_id: (req, file) => file.originalname.split(".")[0], // Keep original filename
  },
});

const upload = multer({ storage });

// Route to create a blog post
router.post("/create", upload.single("photo"), createBlogPost);

// Route to get all blog posts
router.get("/", getAllBlogPosts);

module.exports = router;


// Route to get a specific blog post by ID
router.get('/:id', async (req, res) => {
  try {
    console.log("id : ",req.params.id );
    
    const blog = await Blog.findById(req.params.id); // Example database query
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog' });
  }
});

module.exports = router;
