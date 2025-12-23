const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-12 sm:mt-16 md:mt-24 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12">

          {/* BRAND */}
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-3 sm:mb-4">
              ShopMate
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed">
              Your one-stop destination for premium products and a seamless
              shopping experience.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {['Products', 'Cart', 'Orders', 'Hot Deals'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="
                      text-xs sm:text-sm
                      hover:text-white
                      transition-colors
                    "
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Support
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {['FAQ', 'Shipping Info', 'Returns', 'Privacy Policy'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="
                        text-xs sm:text-sm
                        hover:text-white
                        transition-colors
                      "
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="pt-4 sm:pt-6 border-t border-gray-800">
          <p className="text-center text-xs sm:text-sm">
            © {new Date().getFullYear()} ShopMate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
