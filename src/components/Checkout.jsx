import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

function Checkout() {
  const { 
    cart, 
    getCartTotal, 
    clearCart, 
    isCheckoutOpen, 
    closeCheckout 
  } = useCart()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  })
  const [errors, setErrors] = useState({})

  const validateCardNumber = (number) => {
    // Remove spaces and check if it's a valid number
    const cleaned = number.replace(/\s/g, '')
    return /^\d{16}$/.test(cleaned)
  }

  const validateExpiry = (expiry) => {
    return /^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiry)
  }

  const validateCVV = (cvv) => {
    return /^\d{3,4}$/.test(cvv)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Shipping validation
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required'
      if (!formData.email.trim()) newErrors.email = 'Email is required'
      if (!formData.address.trim()) newErrors.address = 'Address is required'
      if (!formData.city.trim()) newErrors.city = 'City is required'
      if (!formData.state.trim()) newErrors.state = 'State is required'
      if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required'
    }
    
    // Payment validation
    if (step === 2) {
      if (!validateCardNumber(formData.cardNumber)) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number'
      }
      if (!validateExpiry(formData.expiry)) {
        newErrors.expiry = 'Please enter a valid expiry date (MM/YY)'
      }
      if (!validateCVV(formData.cvv)) {
        newErrors.cvv = 'Please enter a valid CVV'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (getCartTotal() === 0) {
      setErrors({ total: 'Cart is empty' })
      return
    }
    
    if (validateForm()) {
      if (step < 3) {
        setStep(step + 1)
      } else {
        // Simulate payment processing
        setTimeout(() => {
          setStep(3)
          clearCart()
        }, 2000)
      }
    }
  }

  const handleClose = () => {
    closeCheckout()
    setStep(1) // Reset step when closing
    setFormData({
      name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      cardNumber: '',
      expiry: '',
      cvv: ''
    })
    setErrors({})
  }

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={handleClose}
          />

          {/* Checkout Panel */}
          <motion.div
            className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b p-6">
                <h2 className="text-2xl font-semibold">Checkout</h2>
                <button
                  onClick={handleClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="border-b p-4">
                <div className="flex items-center justify-between">
                  {[1, 2, 3].map((s) => (
                    <React.Fragment key={s}>
                      <div className="flex flex-col items-center">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            s <= step ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {s < step ? <CheckCircleIcon className="h-5 w-5" /> : s}
                        </div>
                        <span className="mt-2 text-sm">
                          {s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Confirmation'}
                        </span>
                      </div>
                      {s < 3 && (
                        <div
                          className={`flex-1 h-1 mx-2 ${
                            s < step ? 'bg-primary' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="shipping"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-semibold">Shipping Information</h3>
                      <form className="space-y-4">
                        {Object.entries({
                          name: 'Full Name',
                          email: 'Email',
                          address: 'Address',
                          city: 'City',
                          state: 'State',
                          zip: 'ZIP Code'
                        }).map(([key, label]) => (
                          <div key={key}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {label}
                            </label>
                            <input
                              type="text"
                              name={key}
                              value={formData[key]}
                              onChange={handleChange}
                              required
                              autoComplete="off"
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                                errors[key] ? 'border-red-500' : ''
                              }`}
                            />
                            {errors[key] && (
                              <p className="mt-1 text-sm text-red-500">{errors[key]}</p>
                            )}
                          </div>
                        ))}
                      </form>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="payment"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-semibold">Payment Information</h3>
                      <form className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="1234 5678 9012 3456"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                              errors.cardNumber ? 'border-red-500' : ''
                            }`}
                          />
                          {errors.cardNumber && (
                            <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              name="expiry"
                              value={formData.expiry}
                              onChange={handleChange}
                              placeholder="MM/YY"
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                                errors.expiry ? 'border-red-500' : ''
                              }`}
                            />
                            {errors.expiry && (
                              <p className="mt-1 text-sm text-red-500">{errors.expiry}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              CVV
                            </label>
                            <input
                              type="text"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleChange}
                              placeholder="123"
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                                errors.cvv ? 'border-red-500' : ''
                              }`}
                            />
                            {errors.cvv && (
                              <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>
                            )}
                          </div>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="confirmation"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 10, stiffness: 200 }}
                      >
                        <CheckCircleIcon className="h-24 w-24 text-primary mx-auto mb-6" />
                      </motion.div>
                      <h3 className="text-2xl font-semibold mb-4">Order Confirmed!</h3>
                      <p className="text-gray-600 mb-8">
                        Thank you for your purchase. Your order has been confirmed and will be shipped soon.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleClose}
                        className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                      >
                        Continue Shopping
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="border-t p-6">
                {errors.total && (
                  <p className="text-red-500 text-sm mb-4">{errors.total}</p>
                )}
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    ₹{getCartTotal().toLocaleString()}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  {step === 1 ? 'Continue to Payment' : step === 2 ? 'Place Order' : 'Continue Shopping'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Checkout 