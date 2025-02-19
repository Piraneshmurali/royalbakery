const mongoose = require("mongoose");

const cakeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  photo: { type: String, required: true },  // Ensure this field is named `photo` (not `imageUrl`)
});

module.exports = mongoose.model("Cake", cakeSchema);
