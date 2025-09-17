import React from 'react';
import { ArrowRight, MessageSquare, BookOpen, SprayCan as Spray, Tractor } from 'lucide-react';

const Hero = ({ onNavigate }) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* Hero Content */}
        <div className="mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-green-100 rounded-full text-sm font-medium text-gray-800 mb-8">
            🌾 Digital Revolution in Agriculture
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-orange-600 via-green-600 to-blue-800 bg-clip-text text-transparent">
              Digital Krishi Officer
            </span>
            <br />
            <span className="text-gray-800 text-3xl sm:text-4xl md:text-5xl">
              Your AI-Powered Farming Advisor
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Get instant expert advice on pests, weather, inputs, and market trends. 
            Ask questions in Malayalam or English and receive personalized, context-aware solutions 
            from our AI-powered agricultural knowledge system.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => onNavigate('chatbot')}
              className="group bg-gradient-to-r from-orange-500 to-green-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:from-orange-600 hover:to-green-600 transform hover:scale-105"
            >
              Try AI ChatBot Now
              <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => onNavigate('study')}
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold text-lg hover:border-green-500 hover:text-green-600 transition-colors duration-300"
            >
              Explore Resources
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <FeatureCard
            icon={<MessageSquare className="h-8 w-8" />}
            title="AI ChatBot"
            description="Ask questions in Malayalam & get instant expert advice"
            color="from-blue-500 to-blue-600"
            onClick={() => onNavigate('chatbot')}
          />
          <FeatureCard
            icon={<BookOpen className="h-8 w-8" />}
            title="Study & Learn"
            description="Comprehensive agricultural resources & tutorials"
            color="from-green-500 to-green-600"
            onClick={() => onNavigate('study')}
          />
          <FeatureCard
            icon={<Spray className="h-8 w-8" />}
            title="Pesticide Guide"
            description="Complete pesticide information & usage guidelines"
            color="from-orange-500 to-orange-600"
            onClick={() => onNavigate('pesticides')}
          />
          <FeatureCard
            icon={<Tractor className="h-8 w-8" />}
            title="Farm Machines"
            description="Modern farming equipment & technology guides"
            color="from-purple-500 to-purple-600"
            onClick={() => onNavigate('machines')}
          />
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <StatCard number="10,000+" label="Farmers Helped" />
          <StatCard number="50+" label="Crop Types Covered" />
          <StatCard number="24/7" label="Available Support" />
          <StatCard number="95%" label="Accuracy Rate" />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description, color, onClick }) => (
  <div 
    onClick={onClick}
    className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-gray-200"
  >
    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${color} text-white mb-4 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
    <div className="mt-4 text-sm text-blue-600 group-hover:text-blue-800 transition-colors">
      Try Now →
    </div>
  </div>
);

const StatCard = ({ number, label }) => (
  <div className="text-center">
    <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">{number}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);

export default Hero;
