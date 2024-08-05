// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.post("/category", categoryController.addCategory);
router.get("/category", categoryController.getCategory);
router.get("/category/:id", categoryController.getCategoryNameById);
router.put("/category/:id", categoryController.updateCategory);

module.exports = router;
