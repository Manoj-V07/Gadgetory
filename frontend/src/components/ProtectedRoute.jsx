import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const ProtectedRoute = ({ element, requireLogin = true, requiredRole = null }) => {
  const { isLoggedIn, role } = useContext(AuthContext)

  if (requireLogin && !isLoggedIn) {
    return <Navigate to="/login" />
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" />
  }

  return element
}

export default ProtectedRoute
