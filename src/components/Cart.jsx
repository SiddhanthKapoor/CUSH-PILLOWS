import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useCart } from '../context/CartContext'
import Checkout from './Checkout'

function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartCount,
    isCartOpen,
    closeCart,
    openCheckout
  } = useCart()

  const cartVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
    exit: { x: '100%' }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  }

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={closeCart}
            />

            {/* Cart Panel */}
            <motion.div
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
              variants={cartVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b p-6">
                  <h2 className="text-xl font-semibold">Your Cart ({getCartCount()})</h2>
                  <button
                    onClick={closeCart}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                  <AnimatePresence mode="popLayout">
                    {cart.length === 0 ? (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-gray-500"
                      >
                        Your cart is empty
                      </motion.p>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <motion.div
                            key={item.id}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex items-center space-x-4 rounded-lg border p-4"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-20 w-20 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-gray-500">{item.price}</p>
                              <div className="mt-2 flex items-center space-x-2">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="rounded-full p-1 hover:bg-gray-100"
                                >
                                  <MinusIcon className="h-4 w-4" />
                                </button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="rounded-full p-1 hover:bg-gray-100"
                                >
                                  <PlusIcon className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-500 hover:text-red-500"
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                  <div className="border-t p-6">
                    <div className="mb-4 flex justify-between">
                      <span className="font-medium">Total</span>
                      <span className="font-semibold">₹{getCartTotal().toLocaleString()}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={openCheckout}
                      className="w-full rounded-lg bg-primary py-3 text-white transition-colors hover:bg-primary/90"
                    >
                      Proceed to Checkout
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout Component */}
      <Checkout />
    </>
  )
}

export default Cart 