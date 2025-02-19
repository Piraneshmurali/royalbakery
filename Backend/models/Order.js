const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  cakeId: { type: mongoose.Schema.Types.ObjectId, ref: "Cake", required: true },
  toppings: [String],
  message: { type: String },
  occasion: { type: String },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Order", orderSchema);
