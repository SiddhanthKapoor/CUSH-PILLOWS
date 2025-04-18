import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'

function ProductDetail() {
  const { id } = useParams()
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

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          
          <div>
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

            <div className="flex space-x-4">
              <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Add to Cart
              </button>
              <Link 
                to="/products" 
                className="border-2 border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/10 transition-colors"
              >
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail 