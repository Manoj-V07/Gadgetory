import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const products = [
    {
      id: 1,
      title: "Bluetooth Headphones",
      description: "Noise-cancelling over-ear headphones with 20hr battery life.",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
      originalPrice: 2999,
      discountedPrice: 1999,
      isTopProduct: true,
    },
    {
      id: 2,
      title: "Smart Fitness Band",
      description: "Heart-rate monitor, sleep tracking, and step counter.",
      image:
        "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=600",
      originalPrice: 1999,
      discountedPrice: 1299,
      isTopProduct: true,
    },
    {
      id: 3,
      title: "USB-C Fast Charger",
      description: "Superfast Type-C charger compatible with most smartphones.",
      image:
        "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600",
      originalPrice: 1499,
      discountedPrice: 899,
    },
    {
      id: 4,
      title: "Laptop Cooling Pad",
      description: "Dual-fan cooling pad with adjustable height settings.",
      image:
        "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600",
      originalPrice: 2499,
      discountedPrice: 1699,
    },
    {
      id: 5,
      title: "Gaming Mouse RGB",
      description: "Ergonomic mouse with 6 programmable buttons.",
      image:
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600",
      originalPrice: 1799,
      discountedPrice: 1099,
    },
  ];

  return (
    <div className="text-gray-100 min-h-screen">
      {/* HERO */}
      <section className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* TEXT */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 sm:mb-6">
              Discover Smart{" "}
              <span className="text-white">Tech Essentials</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl mb-6 sm:mb-10">
              Discover cutting-edge tech products designed to enhance everyday life.
              From smartphones and laptops to smart accessories, explore top-rated electronics.
              Enjoy powerful performance, modern design, and trusted brands in one place.
              Shop smarter with the latest technology at the best value.
            </p>

            <Link to="/products"
              className="
                bg-white text-gray-900
                px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold
                text-sm sm:text-base
                hover:bg-gray-200
                active:scale-95
                transition-all
              "
            >
              Shop Now 
            </Link>
          </div>

          {/* IMAGE */}
          <div>
            <img
              src="https://media.istockphoto.com/id/508154656/photo/woman-chooses-a-tv-in-the-store.webp?a=1&b=1&s=612x612&w=0&k=20&c=TgHknQGk29juIj_JV-xV5BcmCyB4w2Exm07HbFRTKRE="
              alt="Shopping"
              className="
                rounded-2xl shadow-xl
                border border-gray-800
                w-full h-auto
              "
            />
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-white">
              Top Products
            </h2>
            <p className="text-sm sm:text-base text-gray-400">
              Our most popular picks, trusted by customers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-10">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} hideActions={true} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
