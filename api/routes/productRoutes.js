// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/products', productController.addProduct);
router.get('/products', productController.getProducts);

module.exports = router;
