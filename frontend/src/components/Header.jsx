import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Header = () => {
  const { isLoggedIn, role, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
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

        {/* NAV */}
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

        {/* ACTION */}
        <div className="flex items-center gap-2 sm:gap-3">
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
      </div>
    </header>
  )
}

export default Header
