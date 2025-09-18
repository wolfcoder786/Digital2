import React, { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Footer from "./components/Footer.jsx";
import StudyLearn from "./pages/StudyLearn.jsx";
import Pesticides from "./pages/Pesticides.jsx";
import FarmingMachines from "./pages/FarmingMachines.jsx";
import Cart from "./pages/Cart";

// Lazy-loaded heavy components
const Features = lazy(() => import("./components/Features.jsx"));

// Optional: NotFound component
const NotFound = () => (
  <div className="max-w-5xl mx-auto px-4 py-12 text-center">
    <h1 className="text-3xl font-bold mb-4">Page Not Found ❌</h1>
    <p className="text-gray-600">The page you are looking for does not exist.</p>
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  // Load saved cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setUser({ name: "Farmer Ram" });
    setCurrentPage("home");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCart([]);
    localStorage.removeItem("cart");
    setCurrentPage("home");
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case "home":
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <Suspense
              fallback={<div className="text-center py-12">Loading features...</div>}
            >
              <Features />
            </Suspense>
          </>
        );

      case "study":
        return (
          <div className="pt-8">
            <StudyLearn />
          </div>
        );

      case "pesticides":
        return (
          <div className="pt-8">
            <Pesticides cart={cart} setCart={setCart} />
          </div>
        );

      case "machines":
        return (
          <div className="pt-8">
            <FarmingMachines cart={cart} setCart={setCart} />
          </div>
        );

      case "cart": // ✅ Added Cart Page
        return (
          <div className="pt-8">
            <Cart cart={cart} setCart={setCart} />
          </div>
        );

      case "chatbot":
        return (
          <div className="max-w-5xl mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold mb-6">AI ChatBot 🤖</h1>
            <p className="text-gray-700">
              Ask questions in Malayalam or English and get instant AI-powered advice.
            </p>
          </div>
        );

      default:
        return <NotFound />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
        onShowAuth={handleLogin}
        cart={cart}
      />

      {/* Page Content */}
      <main className="pt-20">{renderPageContent()}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
