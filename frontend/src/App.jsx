import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import AddProduct from './pages/AddProduct'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'
import Order from './pages/Order'
import Products from './pages/Products'
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
        <Route path="/orders" element={<ProtectedRoute element={<Order />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addproduct" element={<ProtectedRoute element={<AddProduct />} requiredRole="admin" />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
