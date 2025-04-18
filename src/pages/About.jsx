import React from 'react'

function About() {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">About Cush</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-6">
              Founded on April 17th, 2025, Cush began with a simple mission: to revolutionize sleep comfort through innovative pillow technology. 
              Our journey started with a team of sleep experts and material scientists who were determined to create the perfect pillow.
            </p>
            <p className="text-gray-600 mb-6">
              Today, we're proud to offer a range of premium pillows that combine cutting-edge materials with ergonomic design, 
              helping people around the world achieve better sleep and improved well-being.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              At Cush, we believe that quality sleep is the foundation of a healthy, productive life. 
              Our mission is to provide innovative sleep solutions that enhance comfort and support, 
              backed by scientific research and customer feedback.
            </p>
            <p className="text-gray-600 mb-6">
              We're committed to sustainability, using eco-friendly materials and ethical manufacturing processes 
              to create products that are good for both you and the planet.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Why Choose Cush?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Quality Materials</h3>
              <p className="text-gray-600">
                We use only the highest quality materials, from premium memory foam to advanced cooling gels, 
                ensuring durability and comfort.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Expert Design</h3>
              <p className="text-gray-600">
                Our pillows are designed by sleep experts and orthopedic specialists to provide optimal support 
                and alignment.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Customer Satisfaction</h3>
              <p className="text-gray-600">
                We stand behind our products with generous trial periods and warranties, 
                ensuring you're completely satisfied with your purchase.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Siddhanth Kapoor</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Siddhanth Kapoor</h3>
              <p className="text-gray-600">Product Designer</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Siddhanth Kapoor</h3>
              <p className="text-gray-600">Sleep Expert</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Siddhanth Kapoor</h3>
              <p className="text-gray-600">Customer Experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About 