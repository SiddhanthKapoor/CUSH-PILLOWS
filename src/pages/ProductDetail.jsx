import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import { motion } from 'framer-motion'

function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const product = products.find(p => p.id === parseInt(id))

  if (!product) {
    return (
      <div className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Link to="/products" className="text-primary hover:text-primary/80">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity)
      setQuantity(1) // Reset quantity after adding to cart
    }
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-semibold text-primary mb-6">{product.price}</p>
            <p className="text-gray-600 mb-8">{product.description}</p>
            
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Features</h2>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
              <ul className="space-y-2">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 hover:text-primary"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-gray-600 hover:text-primary"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                {isAdded ? 'Added to Cart!' : 'Add to Cart'}
              </motion.button>
              <Link 
                to="/products" 
                className="border-2 border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/10 transition-colors"
              >
                Back to Products
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail 