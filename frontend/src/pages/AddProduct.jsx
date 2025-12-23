import { useState } from "react"
import axios from 'axios'
import { toast } from 'react-toastify'

const AddProduct = () => {

      const [ name , setName ] = useState('')
      const [ description , setDescription ] = useState('')
      const [ image , setImage ] = useState('')
      const [ originalPrice , setOriginalPrice ] = useState(0)
      const [ discountedPrice , setDiscountPrice ] = useState(0)


      const handleChangeDescription = (event) => {
          setDescription(event.target.value)
      }
  
      const handleChangeName = (event) => {
          setName(event.target.value)
      }
  
      const handleChangeImage = (event) => {
          setImage(event.target.value)
      }
  
      const handleChangeOriginalPrice = (event) => {
          setOriginalPrice(event.target.value)
      }
  
      const handleChangeDiscountPrice = (event) => {
          setDiscountPrice(event.target.value)
      }
  
      const handleSubmit = async (event) => {
          event.preventDefault()
          
          try {
              const response = await axios.post('http://localhost:3000/products', {
                  id: Date.now(),
                  title: name,
                  description,
                  image,
                  originalPrice: parseFloat(originalPrice),
                  discountedPrice: parseFloat(discountedPrice)
              })
      
              setName("");
              setDescription("");
              setImage("");
              setOriginalPrice(0);
              setDiscountPrice(0);  
              toast.success("Product added successfully!");
          } catch (error) {
              console.error('Error adding product:', error);
              toast.error("Failed to add product: " + (error.response?.data?.message || error.message));
          }
      }


  return (
    <div className="min-h-screen py-12 px-4" style={{backgroundColor: 'rgb(3, 7, 18)'}}>
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-purple-700/30">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Add New Product</h1>
          <p className="text-purple-100">Create a new product listing for your store</p>
        </div>

        {/* Form Container */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-bold text-gray-200 mb-3">Product Name</label>
              <input
                type="text"
                placeholder="Enter product name"
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-700/30 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                value={name}
                onChange={handleChangeName}
                required
              />
            </div>

            {/* Product Description */}
            <div>
              <label className="block text-sm font-bold text-gray-200 mb-3">Description</label>
              <textarea
                placeholder="Enter product description"
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-700/30 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
                rows="4"
                value={description}
                onChange={handleChangeDescription}
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-bold text-gray-200 mb-3">Image URL</label>
              <input
                type="url"
                placeholder="Enter product image URL"
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-700/30 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                value={image}
                onChange={handleChangeImage}
                required
              />
            </div>

            {/* Price Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-200 mb-3">Original Price (₹)</label>
                <input
                  type="number"
                  placeholder="Enter original price"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-purple-700/30 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  value={originalPrice}
                  onChange={handleChangeOriginalPrice}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-200 mb-3">Discounted Price (₹)</label>
                <input
                  type="number"
                  placeholder="Enter discounted price"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-purple-700/30 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  value={discountedPrice}
                  onChange={handleChangeDiscountPrice}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 mt-8"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddProduct