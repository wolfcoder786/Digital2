import React, { useState, useEffect } from "react";
import { Menu, X, User, LogOut, ShoppingCart } from "lucide-react";

const Navbar = ({ currentPage, onNavigate, isAuthenticated, user, onLogout, cart = [] }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: "home", label: "Home", color: "hover:text-orange-600" },
    { id: "study", label: "Study & Learn", color: "hover:text-green-600" },
    { id: "pesticides", label: "Pesticides", color: "hover:text-blue-600" },
    { id: "machines", label: "Farming Machines", color: "hover:text-orange-600" },
    { id: "chatbot", label: "AI ChatBot", color: "hover:text-green-600" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 shadow-lg backdrop-blur-sm border-b-2 border-green-500/40"
          : "bg-white/90 backdrop-blur-sm border-b border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 via-white to-green-500 flex items-center justify-center">
              <span className="text-blue-800 font-bold text-sm">🌾</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
              Digital Krishi Officer
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentPage === item.id
                    ? "text-blue-800"
                    : `text-gray-700 ${item.color}`
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-600 rounded"></span>
                )}
              </button>
            ))}

            {/* Cart Icon */}
            <button
              onClick={() => onNavigate("cart")}
              className="relative flex items-center text-gray-700 hover:text-green-600 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </button>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 rounded-lg">
                  <User className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">{user?.name || "Farmer"}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate("login")}
                className="bg-gradient-to-r from-orange-500 to-green-500 text-white px-6 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-green-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Login / Sign Up
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              aria-label="Toggle Menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900 p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 animate-fade-in">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    currentPage === item.id ? "text-blue-800 bg-blue-50" : `text-gray-700 ${item.color}`
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {/* Mobile Cart */}
              <button
                onClick={() => {
                  onNavigate("cart");
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full text-left px-3 py-2 text-gray-700 hover:bg-green-50 rounded-md"
              >
                <ShoppingCart className="h-5 w-5 text-green-600" />
                <span>Cart ({cart.length})</span>
              </button>

              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm text-green-800 bg-green-50 rounded-md">
                      Welcome, {user?.name || "Farmer"}!
                    </div>
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onNavigate("login");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-orange-500 to-green-500 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Login / Sign Up
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
