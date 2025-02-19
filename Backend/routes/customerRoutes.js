const express = require("express");
const { createOrder } = require("../controllers/orderController");
const { getCakes } = require("../controllers/adminController")
const router = express.Router();

router.post("/order", createOrder);
router.get("/cakes", getCakes);

module.exports = router;
