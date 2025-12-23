import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  // Initialize state from sessionStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!sessionStorage.getItem('token')
  })
  const [role, setRole] = useState(() => {
    return sessionStorage.getItem('role')
  })
  const [email, setEmail] = useState(() => {
    return sessionStorage.getItem('email')
  })
  const [token, setToken] = useState(() => {
    return sessionStorage.getItem('token')
  })

  useEffect(() => {
    const checkAuth = () => {
      const savedToken = sessionStorage.getItem('token')
      const savedRole = sessionStorage.getItem('role')
      const savedEmail = sessionStorage.getItem('email')
      
      if (savedToken && savedRole && savedEmail) {
        setToken(savedToken)
        setRole(savedRole)
        setEmail(savedEmail)
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }

    checkAuth()

    window.addEventListener('storage', checkAuth)
    return () => window.removeEventListener('storage', checkAuth)
  }, [])

  const register = async (email, password, role = 'user') => {
    try {
      const response = await fetch(`https://gadgetory-mzvj.onrender.com/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, role })
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.message || 'Registration failed')
        return false
      }

      sessionStorage.setItem('token', data.token)
      sessionStorage.setItem('role', data.user.role)
      sessionStorage.setItem('email', data.user.email)

      setToken(data.token)
      setIsLoggedIn(true)
      setRole(data.user.role)
      setEmail(data.user.email)
      
      toast.success('Registration successful')
      return true
    } catch (error) {
      toast.error('Registration error: ' + error.message)
      return false
    }
  }

  const login = async (email, password) => {
    try {
      const response = await fetch(`https://gadgetory-mzvj.onrender.com/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.message || 'Login failed')
        return false
      }

      sessionStorage.setItem('token', data.token)
      sessionStorage.setItem('role', data.user.role)
      sessionStorage.setItem('email', data.user.email)

      setToken(data.token)
      setIsLoggedIn(true)
      setRole(data.user.role)
      setEmail(data.user.email)
      
      toast.success('Login successful')
      return true
    } catch (error) {
      toast.error('Login error: ' + error.message)
      return false
    }
  }

  const logout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('role')
    sessionStorage.removeItem('email')
    
    setToken(null)
    setIsLoggedIn(false)
    setRole(null)
    setEmail(null)
    toast.success('Logged out successfully')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, email, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

