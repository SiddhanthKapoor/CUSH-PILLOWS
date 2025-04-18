import React from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'

function Products() {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Our Products</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link 
              key={product.id} 
              to={`/products/${product.id}`}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
            >
              <div className="relative pt-[75%]">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <div className="mt-auto">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">{product.price}</span>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products 