const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require("../utils/auth");

router.get('/', auth.authenticateToken, auth.authenticateAdmin, productController.getAllProducts);
router.get('/search', productController.searchProduct);
router.post('/', auth.authenticateToken, productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', auth.authenticateToken, productController.updateProduct);
router.delete('/:id', auth.authenticateToken, productController.deleteProduct);
router.get('/category/:categoryName',  productController.getProductByCategory);
router.get('/user/:id',  productController.getProductUser);


module.exports = router;