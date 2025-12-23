const express = require('express');
const { getCart, addToCart, removeFromCart, updateCartItem } = require('../controllers/cartController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Apply authentication middleware to all cart routes
router.use(auth);

router.get('/', getCart);
router.post('/', addToCart);
router.delete('/:productId', removeFromCart);
router.patch('/:productId', updateCartItem);

module.exports = router;