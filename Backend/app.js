const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const customerRoutes = require("./routes/customerRoutes");
const blogRoutes = require("./routes/blogRoutes");

require("dotenv").config();

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/admin", adminRoutes);
app.use("/api/customer", customerRoutes);

app.use("/api/blogs", blogRoutes);
module.exports = app;
