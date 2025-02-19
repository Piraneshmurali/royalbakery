const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const Cake = require("../models/Cake");
const Order = require("../models/Order");
const cloudinary = require("../config/cloudinaryConfig");
const fs = require("fs");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  };
  
  exports.registerAdmin = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const adminExists = await Admin.findOne({ username });
      if (adminExists) {
        return res.status(400).json({ message: "Admin already exists" });
      }
  
      const admin = await Admin.create({ username, password });
      res.status(201).json({ message: "Admin registered successfully!" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  
  exports.loginAdmin = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const admin = await Admin.findOne({ username });
      if (admin && (await admin.matchPassword(password))) {
        res.status(200).json({
          _id: admin.id,
          username: admin.username,
          token: generateToken(admin.id),
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  
  exports.getAdminProfile = async (req, res) => {
    try {
      const admin = await Admin.findById(req.admin.id).select("-password");
      res.status(200).json(admin);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };


// Add Cake with Image Upload (Same as Blog)
exports.addCake = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    // Use Cloudinary's direct upload URL (already handled by multer storage)
    const imageUrl = req.file.path;

    // Create a new cake entry
    const cake = new Cake({
      name,
      description,
      price,
      photo: imageUrl, // Store Cloudinary URL in the 'photo' field
    });

    await cake.save();

    res.status(201).json({ message: "Cake added successfully", cake });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add cake" });
  }
};



exports.getCakes = async (req, res) => {
  try {
    const cakes = await Cake.find();
    res.status(200).json(cakes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteCake = async (req, res) => {
    try {
      const { id } = req.params; 
  
      const cake = await Cake.findById(id);
      if (!cake) {
        return res.status(404).json({ message: "Cake not found" });
      }
  
      await Cake.findByIdAndDelete(id);
      res.status(200).json({ message: "Cake deleted successfully!" });
    } catch (err) {
      console.error("Error deleting cake:", err.message);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  

  exports.updateCake = async (req, res) => {
    try {
      const { name, description, price } = req.body;
      const cakeId = req.params.id;
      let updatedData = { name, description, price };
  
      if (req.file) {
        // Use Cloudinary's direct upload URL (ensure field matches your model)
        updatedData.photo = req.file.path;  // Make sure this is 'photo' (not 'imageUrl')
      }
  
      const updatedCake = await Cake.findByIdAndUpdate(cakeId, updatedData, { new: true });
  
      if (!updatedCake) {
        return res.status(404).json({ error: "Cake not found" });
      }
  
      res.status(200).json({ message: "Cake updated successfully", updatedCake });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update cake" });
    }
  };
  
    exports.getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find().populate("cakeId"); // Populating the cakeId to get cake details
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  exports.deleteOrder = async (req, res) => {
    try {
      const { id } = req.params;
    
      // Check if the order exists
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
    
      // Delete the order
      await Order.findByIdAndDelete(id);
      res.status(200).json({ message: "Order deleted successfully!" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  exports.updateOrder = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body; // Data to update the order
  
      // Check if the order exists
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: `Order with ID ${id} not found` });
      }
  
      // Update the order
      const updatedOrder = await Order.findByIdAndUpdate(id, updatedData, { new: true });
      
      // Check if update was successful
      if (!updatedOrder) {
        return res.status(500).json({ message: "Failed to update the order" });
      }
  
      res.status(200).json(updatedOrder);  // Return the updated order
    } catch (err) {
      console.error("Error updating order:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  
  