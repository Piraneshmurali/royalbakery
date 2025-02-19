const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");
const { 
  loginAdmin, 
  registerAdmin, 
  getAdminProfile, 
  addCake, 
  deleteCake, 
  updateCake, 
  getAllOrders, 
  deleteOrder, 
  updateOrder 
} = require("../controllers/adminController");

const Cake = require("../models/Cake"); // Import the Cake model
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Configure Multer to Upload Directly to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "cake-images", // Cloudinary folder name for cake images
    format: async () => "jpg", // Convert all images to JPG
    public_id: (req, file) => file.originalname.split(".")[0], // Keep original filename
  },
});

const upload = multer({ storage });

// Admin Routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/profile", authMiddleware, getAdminProfile); 

// Cake Routes
router.post("/cakes", authMiddleware, upload.single("photo"), addCake); // Add cake with image upload
router.put("/cakes/:id", authMiddleware, upload.single("photo"), updateCake); // Update cake with image upload
router.delete("/cakes/:id", authMiddleware, deleteCake); // Delete cake

// Order Routes
router.get("/orders", authMiddleware, getAllOrders); // Get all orders
router.delete("/orders/:id", authMiddleware, deleteOrder); // Delete an order
router.put("/orders/:id", authMiddleware, updateOrder); // Update an order

// Route to get a specific cake by ID
router.get("/cakes/:id", async (req, res) => {
  try {
    const cake = await Cake.findById(req.params.id); // Fetch cake by ID
    res.json(cake);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cake details" });
  }
});

module.exports = router;
