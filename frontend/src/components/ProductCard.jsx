import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const ProductCard = ({
  cartItemId,
  id,
  title,
  description,
  image,
  originalPrice,
  discountedPrice,
  rating = 0,
  isTopProduct = false,
  isCart = false,
  hideActions = false,
  onRemove,
}) => {
  const { token } = useContext(AuthContext);

  const handleAddToCart = async () => {
    if (!token) {
      toast.error("Please login first to add items to cart");
      return;
    }

    try {
      await axios.post(
        "https://gadgetory-mzvj.onrender.com/carts",
        { productId: id, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Product added to cart!");
    } catch (err) {
      toast.error(err.response?.data?.error || err.message);
    }
  };

  const handleRemoveFromCart = async () => {
    if (!token) return;

    try {
      await axios.delete(
        `https://gadgetory-mzvj.onrender.com/carts/${cartItemId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onRemove && onRemove(cartItemId);
    } catch (err) {
      toast.error(err.response?.data?.error || err.message);
    }
  };

  return (
    <div
      className="
        group bg-gray-900 w-full
        border border-gray-200
        rounded-xl sm:rounded-2xl overflow-hidden
        hover:shadow-xl hover:border-gray-300
        transition-all duration-300
      "
    >
      {/* IMAGE */}
      <div className="relative h-40 sm:h-52 bg-gray-50 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="
            w-full h-full object-cover
            group-hover:scale-105
            transition-transform duration-300
          "
        />

        {/* TOP PRODUCT BADGE */}
        {isTopProduct && (
          <span
            className="
              absolute top-2 sm:top-4 left-2 sm:left-4
              bg-blue-100 text-blue-700
              text-xs font-semibold
              px-2 sm:px-3 py-1 sm:py-1.5 rounded-full
              shadow-sm
            "
          >
            Top Product
          </span>
        )}

        {/* HIGHLY RATED BADGE */}
        {rating > 4.5 && (
          <span
            className="
              absolute top-2 sm:top-4 right-2 sm:right-4
              bg-yellow-100 text-yellow-700
              text-xs font-semibold
              px-2 sm:px-3 py-1 sm:py-1.5 rounded-full
              shadow-sm
            "
          >
            ⭐ Highly Rated
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-3 sm:p-5 flex flex-col flex-1">
        <h3 className="text-sm sm:text-base font-semibold text-gray-50 line-clamp-2 mb-2">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 mb-3 sm:mb-4">
          {description}
        </p>

        {/* PRICE */}
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5">
          <span className="text-base sm:text-lg font-semibold text-gray-50">
            ₹{discountedPrice}
          </span>
          <span className="text-xs sm:text-sm text-gray-200 line-through">
            ₹{originalPrice}
          </span>
        </div>

        {/* CTA */}
        {!hideActions && (
          <>
            {isCart ? (
              <button
                onClick={handleRemoveFromCart}
                className="
                  w-full
                  py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm
                  bg-gray-100 text-gray-700
                  hover:bg-red-50 hover:text-red-600
                  transition-all
                "
              >
                Remove
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="
                  w-full
                  py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium
                  bg-black text-white
                  hover:bg-gray-800
                  active:scale-95
                  transition-all
                "
              >
                Add to Cart
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
