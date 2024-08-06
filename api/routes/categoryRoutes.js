// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.post("/category", categoryController.addCategory);
router.get("/category", categoryController.getCategory);
router.get("/category/:id", categoryController.getCategoryNameById);
router.put("/category/:id", categoryController.updateCategory);
router.delete("/category/:id", categoryController.deleteCategory);

module.exports = router;
