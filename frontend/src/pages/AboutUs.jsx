import React from 'react';
import { Heart, Leaf, Brain, Apple } from 'lucide-react';

function AboutUs() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-green-800 mb-6">Our Commitment to Your Health</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At GoodBites, we're passionate about empowering you to make informed decisions about the food you consume.
            Our mission is to promote transparency in food products and guide you towards healthier choices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center p-6">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Heart className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Health First</h3>
            <p className="text-gray-600">We prioritize your well-being by providing accurate health information about food products.</p>
          </div>

          <div className="text-center p-6">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Leaf className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Natural Focus</h3>
            <p className="text-gray-600">We encourage choosing natural, minimally processed foods for better nutrition.</p>
          </div>

          <div className="text-center p-6">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Brain className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Education</h3>
            <p className="text-gray-600">We help you understand ingredient lists and make informed choices.</p>
          </div>

          <div className="text-center p-6">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Apple className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Better Alternatives</h3>
            <p className="text-gray-600">We suggest healthier alternatives to help you improve your diet.</p>
          </div>
        </div>

        <div className="bg-green-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">1M+</div>
              <p className="text-gray-600">Products Analyzed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">500K+</div>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <p className="text-gray-600">Health Experts</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-6">Join Us in Making Healthier Choices</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Together, we can build a healthier future by making informed decisions about the food we consume.
            Start your journey to better health today.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;