import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://gadgetory-mzvj.onrender.com/carts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      response.ok ? setCart(data.cart) : setError(data.error);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await fetch(`https://gadgetory-mzvj.onrender.com/carts/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      setError(err.message);
    }
  };

  const updateQuantity = async (productId, qty) => {
    if (qty < 1) return removeFromCart(productId);
    try {
      await fetch(`https://gadgetory-mzvj.onrender.com/carts/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: qty }),
      });
      fetchCart();
    } catch (err) {
      setError(err.message);
    }
  };

  const calculateTotal = () =>
    cart?.products?.reduce(
      (t, i) => t + i.product.discountedPrice * i.quantity,
      0
    ) || 0;

  if (loading)
    return <div className="min-h-screen bg-gray-950 text-center p-12 text-gray-400">Loading...</div>;

  if (error)
    return <div className="min-h-screen bg-gray-950 text-center p-12 text-red-400">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {/* HEADER */}
      <div className="border-b border-gray-800 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {!cart || cart.products.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
            <p className="text-gray-400 text-xl mb-6">Your cart is empty</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-6">
              {cart.products.map((item) => (
                <div
                  key={item.product._id}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
                >
                  <div className="flex gap-6">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-24 h-24 rounded-lg object-cover border border-gray-800"
                    />

                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white">
                        {item.product.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4">
                        {item.product.description}
                      </p>

                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold">
                          ₹{item.product.discountedPrice}
                        </span>
                        <span className="text-sm line-through text-gray-500">
                          ₹{item.product.originalPrice}
                        </span>
                      </div>
                    </div>

                    {/* QTY */}
                    <div className="flex flex-col items-end justify-between">
                      <div className="flex items-center bg-gray-950 border border-gray-800 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                          className="px-3 py-2 hover:bg-gray-800"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.product._id, Number(e.target.value))
                          }
                          className="w-12 text-center bg-gray-950 border-l border-r border-gray-800 focus:outline-none"
                        />
                        <button
                          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                          className="px-3 py-2 hover:bg-gray-800"
                        >
                          +
                        </button>
                      </div>

                      <p className="font-bold mt-3">
                        ₹{item.product.discountedPrice * item.quantity}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="mt-4 text-red-400 hover:text-red-300 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 h-fit sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 border-b border-gray-800 pb-6 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{calculateTotal()}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-green-400">FREE</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax</span>
                  <span>₹0</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold mb-8">
                <span>Total</span>
                <span>₹{calculateTotal()}</span>
              </div>

              <button
                onClick={() => navigate("/orders")}
                className="w-full bg-white text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-200 transition mb-3"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate("/products")}
                className="w-full bg-gray-800 border border-gray-700 py-3 rounded-lg hover:bg-gray-700 transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
