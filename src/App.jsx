import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import About from './pages/About'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Contact from './pages/Contact'
import { products } from './data/products'
import { CartProvider, useCart } from './context/CartContext'
import Cart from './components/Cart'

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { setIsCheckoutOpen, getCartCount, openCart } = useCart()

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary">Cush</Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/products" className="text-gray-700 hover:text-primary transition-colors">Products</Link>
              <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">Contact</Link>
              <button 
                onClick={() => openCart()}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors relative"
              >
                <ShoppingCartIcon className="h-6 w-6" />
                <span>Cart</span>
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
                {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-3 space-y-3">
              <Link to="/products" className="block text-gray-700 hover:text-primary">Products</Link>
              <Link to="/about" className="block text-gray-700 hover:text-primary">About</Link>
              <Link to="/contact" className="block text-gray-700 hover:text-primary">Contact</Link>
              <button 
                onClick={() => {
                  openCart()
                  setIsMenuOpen(false)
                }}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary relative"
              >
                <ShoppingCartIcon className="h-6 w-6" />
                <span>Cart</span>
                {getCartCount() > 0 && (
                  <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={
          <div className="pt-16">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-primary to-secondary h-[600px]">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                <div className="max-w-2xl">
                  <h1 className="text-5xl font-bold text-white mb-6">Experience Ultimate Comfort</h1>
                  <p className="text-xl text-white/90 mb-8">Discover our premium collection of pillows designed for perfect sleep and relaxation.</p>
                  <div className="flex space-x-4">
                    <Link to="/products" className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                      Shop Now
                    </Link>
                    <Link to="/about" className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
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
              <div className="text-center mt-12">
                <Link 
                  to="/products" 
                  className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  View All Products
                </Link>
              </div>
            </div>
          </div>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Cush</h3>
              <p className="text-gray-600">We're dedicated to providing the most comfortable and supportive pillows for a better night's sleep.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/products" className="text-gray-600 hover:text-primary">Products</Link></li>
                <li><Link to="/about" className="text-gray-600 hover:text-primary">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="text-gray-600">Email: info@cush.com</li>
                <li className="text-gray-600">Phone: 999 999-9999</li>
                <li className="text-gray-600">Address: Phase 2 Electronic City</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600">© 2025 Cush. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Cart */}
      <Cart />
    </div>
  )
}

function App() {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  )
}

export default App 