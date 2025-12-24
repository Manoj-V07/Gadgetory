import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

const Header = () => {
  const { isLoggedIn, role, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMobileMenuOpen(false)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="bg-gray-950 border-b border-gray-800 sticky top-0 z-50">
      <div className="h-auto sm:h-[72px] max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between py-3 sm:py-0">

        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <h1 className="text-lg sm:text-2xl font-extrabold tracking-wide text-white hover:text-gray-300 transition">
            Gadgetory
          </h1>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-4 lg:gap-8">
          {['Home', 'Products', 'Cart', 'Orders'].map((item) => (
            <Link
              key={item}
              to={`/${item === 'Home' ? '' : item.toLowerCase()}`}
              className="
                text-xs lg:text-sm text-gray-400 hover:text-white
                font-medium transition-colors
              "
            >
              {item}
            </Link>
          ))}

          {role === 'admin' && (
            <Link
              to="/addproduct"
              className="
                text-xs lg:text-sm text-gray-400 hover:text-white
                font-medium transition-colors
              "
            >
              Add Product
            </Link>
          )}
        </nav>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop Auth Button */}
          <div className="hidden md:flex">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="
                  bg-gray-800 text-gray-200
                  px-3 sm:px-5 py-2 rounded-lg text-xs sm:text-sm
                  hover:bg-gray-700 hover:text-white
                  transition-all
                  active:scale-95
                "
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button
                  className="
                    bg-white text-gray-900
                    px-3 sm:px-5 py-2 rounded-lg text-xs sm:text-sm
                    font-semibold
                    hover:bg-gray-200
                    transition-all
                    active:scale-95
                  "
                >
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-current transition-all duration-300 my-1 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`
          md:hidden
          overflow-hidden
          transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'max-h-96 border-t border-gray-800' : 'max-h-0'}
        `}
      >
        <nav className="flex flex-col px-4 py-3 space-y-1">
          {['Home', 'Products', 'Cart', 'Orders'].map((item) => (
            <Link
              key={item}
              to={`/${item === 'Home' ? '' : item.toLowerCase()}`}
              onClick={closeMobileMenu}
              className="
                text-sm text-gray-400 hover:text-white hover:bg-gray-800
                font-medium transition-colors
                py-2 px-3 rounded-lg
              "
            >
              {item}
            </Link>
          ))}

          {role === 'admin' && (
            <Link
              to="/addproduct"
              onClick={closeMobileMenu}
              className="
                text-sm text-gray-400 hover:text-white hover:bg-gray-800
                font-medium transition-colors
                py-2 px-3 rounded-lg
              "
            >
              Add Product
            </Link>
          )}

          {/* Mobile Auth Button */}
          <div className="pt-2">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="
                  w-full bg-gray-800 text-gray-200
                  px-4 py-2 rounded-lg text-sm
                  hover:bg-gray-700 hover:text-white
                  transition-all
                  active:scale-95
                "
              >
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={closeMobileMenu} className="block">
                <button
                  className="
                    w-full bg-white text-gray-900
                    px-4 py-2 rounded-lg text-sm
                    font-semibold
                    hover:bg-gray-200
                    transition-all
                    active:scale-95
                  "
                >
                  Login
                </button>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
