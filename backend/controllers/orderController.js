const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const placeOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    if (!shippingAddress) {
      return res.status(400).json({ error: "Shipping address is required" });
    }

    const cart = await Cart.findOne({ user: req.userData.id }).populate("products.product");

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ error: "Cart is empty. Add items before placing order." });
    }

    let totalPrice = 0;
    const orderItems = cart.products.map(item => {
      const itemTotal = item.product.discountedPrice * item.quantity;
      totalPrice += itemTotal;
      return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.discountedPrice
      };
    });

    const order = await Order.create({
      user: req.userData.id,
      items: orderItems,
      totalPrice,
      shippingAddress,
      paymentMethod: paymentMethod || 'cod'
    });

    cart.products = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to place order",
      message: error.message
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userData.id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch orders",
      message: error.message
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({
      _id: orderId,
      user: req.userData.id
    }).populate("items.product");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch order",
      message: error.message
    });
  }
};

module.exports = { placeOrder, getOrders, getOrderById };
