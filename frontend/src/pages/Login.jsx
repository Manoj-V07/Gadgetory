import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [role, setRole] = useState('user')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login, register } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email.trim() || !password.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)
    let success
    
    if (isLogin) {
      success = await login(email, password)
    } else {
      success = await register(email, password, role)
    }

    setLoading(false)
    
    if (success) {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{backgroundColor: 'rgb(3, 7, 18)'}}>
      <div className="w-full max-w-md bg-gray-950 rounded-2xl shadow-2xl overflow-hidden border border-gray-800">

        {/* Form Container */}
        <div className="p-8">
          <h2 className="font-bold text-center text-2xl mb-8 text-white">
            {isLogin ? 'Login' : 'Create Account'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Email Address</label> 
              <input 
                type="email" 
                placeholder="you@example.com" 
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Role Selection - Register Only */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">Account Type</label>
                <select 
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">Customer</option>
                  <option value="admin">Seller/Admin</option>
                </select>
              </div>
            )}
            
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-white text-gray-900 font-bold py-3 rounded-lg transition-all duration-300 shadow-md hover:bg-gray-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div className="mt-8 pt-6 text-center border-t border-gray-800">
            <p className="text-gray-300 text-sm mb-4">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </p>
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setEmail('')
                setPassword('')
              }}
              className="text-gray-200 hover:text-white font-semibold text-sm transition"
              type="button"
            >
              {isLogin ? 'Create New Account' : 'Sign In Instead'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login