const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  getFeaturedProducts,
  seedProducts,
} = require('../controllers/productController');

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.post('/seed', seedProducts);
router.get('/:id', getProductById);

module.exports = router;
