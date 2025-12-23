const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Validate product ID and quantity
const validateProductAndQuantity = (productId, quantity) => {
  if (!productId) return { valid: false, error: "Product ID is required" };
  if (!quantity || quantity < 1) return { valid: false, error: "Quantity must be at least 1" };
  return { valid: true };
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userData.id })
      .populate("products.product");
    
    if (!cart) {
      return res.status(200).json({ message: "Cart is empty", cart: { products: [] } });
    }
    
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart", message: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    // Validate input
    const validation = validateProductAndQuantity(productId, quantity);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let cart = await Cart.findOne({ user: req.userData.id });

    if (!cart) {
      // Create a new cart
      cart = await Cart.create({ 
        user: req.userData.id, 
        products: [{ product: productId, quantity }] 
      });
      // Populate products before returning
      await cart.populate("products.product");
      return res.status(201).json({ message: "Cart created", cart });
    }

    // Check if product already exists in cart
    const existingProduct = cart.products.find(item => item.product.toString() === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    
    // Populate products before returning
    await cart.populate("products.product");
    
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ error: "Failed to add product to cart", message: error.message });
  }
};;

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    
    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const cart = await Cart.findOne({ user: req.userData.id });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.products = cart.products.filter(item => item.product.toString() !== productId);
    await cart.save();
    
    // Populate products before returning
    await cart.populate("products.product");
    
    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove product from cart", message: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    // Validate input
    const validation = validateProductAndQuantity(productId, quantity);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const cart = await Cart.findOne({ user: req.userData.id });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const cartItem = cart.products.find(item => item.product.toString() === productId);
    if (!cartItem) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    cartItem.quantity = quantity;
    await cart.save();
    
    // Populate products before returning
    await cart.populate("products.product");
    
    res.status(200).json({ message: "Cart item updated", cart });
  } catch (error) {
    res.status(500).json({ error: "Failed to update cart item", message: error.message });
  }
};

module.exports = { getCart, addToCart, removeFromCart, updateCartItem };