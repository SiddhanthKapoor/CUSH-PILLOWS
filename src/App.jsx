import { useState } from 'react'
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const products = [
  {
    id: 1,
    name: "Cooling Gel Pillow",
    description: "Advanced temperature-regulating pillow with gel-infused memory foam",
    price: "₹2,799",
    image: "https://hips.hearstapps.com/hmg-prod/images/ghi-best-cooling-pillows-1581633594.png?crop=0.8666666666666666xw:1xh;center,top&resize=1200:*",
    features: [
      "Heat-dissipating gel layer",
      "Hypoallergenic bamboo cover",
      "Orthopedic-certified support",
      "60-night trial period"
    ],
    category: "cooling"
  },
  {
    id: 2,
    name: "Cervical Pillow",
    description: "Medical-grade neck support pillow with adjustable contour",
    price: "₹2,499",
    image: "https://contents.mediadecathlon.com/p1749048/f0b275c3207e208e12771a5c385d3ff8/p1749048.jpg",
    features: [
      "Ergonomic curve design",
      "Removable washable cover",
      "Certified orthopedic support",
      "Includes sleep position guide"
    ],
    category: "neck-support"
  },
  {
    id: 3,
    name: "Contour Pillow",
    description: "Dual-layer memory foam for perfect spinal alignment",
    price: "₹2,199",
    image: "https://thesleepcompany.in/cdn/shop/files/Adjustable_Plush_Pillow_01_73819371-924c-48af-abe9-38a21dc0d586.jpg?v=1742150416&width=1445",
    features: [
      "Adaptive memory foam core",
      "Breathable 3D mesh cover",
      "Medium-firm support",
      "5-year warranty"
    ],
    category: "orthopedic"
  },
  {
    id: 4,
    name: "Coccyx Pillow",
    description: "Orthopedic cushion for tailbone pain relief",
    price: "₹1,999",
    image: "https://assets.ajio.com/medias/sys_master/root/20230624/ynlf/6496b1a5a9b42d15c9e6265c/-473Wx593H-465545411-grey-MODEL.jpg",
    features: [
      "U-shaped ergonomic design",
      "Water-resistant coating",
      "Portable carry handle",
      "30-day return policy"
    ],
    category: "pain-relief"
  }
]

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary">Cush</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#products" className="text-gray-700 hover:text-primary transition-colors">Products</a>
              <a href="#about" className="text-gray-700 hover:text-primary transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-primary transition-colors">Contact</a>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors">
                <ShoppingCartIcon className="h-6 w-6" />
                <span>Cart</span>
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
              <a href="#products" className="block text-gray-700 hover:text-primary">Products</a>
              <a href="#about" className="block text-gray-700 hover:text-primary">About</a>
              <a href="#contact" className="block text-gray-700 hover:text-primary">Contact</a>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-primary">
                <ShoppingCartIcon className="h-6 w-6" />
                <span>Cart</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="pt-16">
        <div className="relative bg-gradient-to-r from-primary to-secondary h-[600px]">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold text-white mb-6">Experience Ultimate Comfort</h1>
              <p className="text-xl text-white/90 mb-8">Discover our premium collection of pillows designed for perfect sleep and relaxation.</p>
              <div className="flex space-x-4">
                <button className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Shop Now
                </button>
                <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Premium Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <ul className="space-y-2 mb-4">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
                <li><a href="#products" className="text-gray-600 hover:text-primary">Products</a></li>
                <li><a href="#about" className="text-gray-600 hover:text-primary">About Us</a></li>
                <li><a href="#contact" className="text-gray-600 hover:text-primary">Contact</a></li>
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
            <p className="text-center text-gray-600">© 2024 Cush. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App 