// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api", productRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
module.exports = app;
