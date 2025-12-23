const express = require('express');
const { placeOrder, getOrders, getOrderById } = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Apply authentication middleware to all order routes
router.use(auth);

router.post('/', placeOrder);
router.get('/', getOrders);
router.get('/:orderId', getOrderById);

module.exports = router;
