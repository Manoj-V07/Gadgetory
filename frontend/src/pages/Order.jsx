import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Order = () => {
  const [showCheckout, setShowCheckout] = useState(true);
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    shippingAddress: "",
    paymentMethod: "cod",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!showCheckout) fetchOrders();
  }, [showCheckout]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("https://gadgetory-mzvj.onrender.com/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      response.ok ? setOrders(data.orders) : setError(data.error);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!formData.shippingAddress.trim()) {
      setError("Please enter a shipping address");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("https://gadgetory-mzvj.onrender.com/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Order placed successfully!");
        setFormData({ shippingAddress: "", paymentMethod: "cod" });
        setTimeout(() => setShowCheckout(false), 1500);
      } else setError(data.error);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {/* HEADER */}
      <div className="border-b border-gray-800 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-white">Orders</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* TABS */}
        <div className="flex gap-4 mb-14">
          {["Place Order", "My Orders"].map((tab, i) => {
            const active = (i === 0 && showCheckout) || (i === 1 && !showCheckout);
            return (
              <button
                key={tab}
                onClick={() => setShowCheckout(i === 0)}
                className={`px-8 py-3 rounded-lg font-semibold transition ${
                  active
                    ? "bg-white text-gray-900"
                    : "bg-gray-900 border border-gray-800 hover:bg-gray-800"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* CHECKOUT */}
        {showCheckout ? (
          <div className="max-w-2xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="p-8 border-b border-gray-800">
              <h2 className="text-2xl font-bold text-white">Checkout</h2>
              <p className="text-gray-400 mt-1">Complete your purchase</p>
            </div>

            <div className="p-8 space-y-6">
              {error && (
                <div className="bg-red-900/30 border border-red-800 text-red-400 px-5 py-4 rounded-lg">
                  {error}
                </div>
              )}

              {successMessage && (
                <div className="bg-green-900/30 border border-green-800 text-green-400 px-5 py-4 rounded-lg">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <div>
                  <label className="block mb-2 font-semibold">Shipping Address</label>
                  <textarea
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-600 resize-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold">Payment Method</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-600"
                  >
                    <option value="cod">Cash on Delivery</option>
                    <option value="upi">UPI</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-white text-gray-900 font-semibold py-3 rounded-lg hover:bg-gray-200 transition"
                  >
                    {loading ? "Processing..." : "Place Order"}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/cart")}
                    className="flex-1 bg-gray-800 border border-gray-700 py-3 rounded-lg hover:bg-gray-700 transition"
                  >
                    Back to Cart
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* MY ORDERS */
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
                <p className="text-gray-400 mb-6">You haven't placed any orders yet</p>
                <button
                  onClick={() => navigate("/products")}
                  className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden"
                >
                  <div className="p-6 border-b border-gray-800 flex justify-between">
                    <div>
                      <h3 className="font-bold text-white">
                        Order #{order._id.slice(-6).toUpperCase()}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {new Date(order.createdAt).toDateString()}
                      </p>
                    </div>
                    <span className="text-sm px-4 py-2 bg-gray-800 rounded-full capitalize">
                      {order.status}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between border-b border-gray-800 pb-2"
                      >
                        <span>{item.product.title} × {item.quantity}</span>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 border-t border-gray-800 flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{order.totalPrice}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
