import React from 'react';
import { Mail, Phone, MapPin, Globe, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 via-white to-green-500 flex items-center justify-center">
                <span className="text-blue-800 font-bold text-sm">🌾</span>
              </div>
              <span className="text-xl font-bold">Digital Krishi Officer</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering Indian farmers with AI-powered agricultural advisory services. 
              Get instant expert advice in Malayalam and English.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Globe className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Home</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">AI ChatBot</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Study & Learn</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Pesticides</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Farm Machines</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">About Us</a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Crop Calendar</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Weather Updates</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Market Prices</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Government Schemes</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Training Videos</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Expert Articles</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">info@digitalkrishiofficer.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">Kerala, India</span>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-2">Available in:</h4>
              <div className="flex space-x-4 text-sm">
                <span className="px-2 py-1 bg-gray-800 rounded text-gray-300">മലയാളം</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-gray-300">English</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Digital Krishi Officer. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>

        {/* Government Partnership */}
        <div className="mt-6 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-xs mb-2">In partnership with:</p>
          <div className="flex justify-center space-x-8 text-xs text-gray-400">
            <span>Department of Agriculture, Kerala</span>
            <span>Krishibhavan Network</span>
            <span>Kerala Agricultural University</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
