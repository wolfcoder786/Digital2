import React, { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Footer from "./components/Footer.jsx";
import StudyLearn from "./pages/StudyLearn.jsx";
import Pesticides from "./pages/Pesticides.jsx";
import FarmingMachines from "./pages/FarmingMachines.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Chatbot from "./pages/Chatbot.jsx"; // ✅ Added chatbot page

const Features = lazy(() => import("./components/Features.jsx"));

const NotFound = () => (
  <div className="text-center py-12 text-gray-600">
    <h1 className="text-3xl font-bold mb-4">Page Not Found ❌</h1>
    <p>The page you are looking for does not exist.</p>
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Login handler (used for login or after signup)
  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setCurrentPage("home"); // always go to landing page after login/signup
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCart([]);
    localStorage.removeItem("cart");
    setCurrentPage("home");
  };

  const handleNavigate = (page) => {
    const authRequiredPages = ["chatbot"]; // ✅ only chatbot requires login
    if (authRequiredPages.includes(page) && !isAuthenticated) {
      setCurrentPage("login");
      return;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cart management functions
  const updateCartQuantity = (id, qty) => {
    if (qty <= 0) {
      setCart(cart.filter((item) => item.id !== id));
    } else {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: qty } : item
        )
      );
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const pages = {
    home: (
      <>
        <Hero onNavigate={handleNavigate} />
        <Suspense
          fallback={<div className="text-center py-12">Loading features...</div>}
        >
          <Features />
        </Suspense>
      </>
    ),
    study: <StudyLearn />,
    pesticides: <Pesticides cart={cart} setCart={setCart} />,
    machines: <FarmingMachines cart={cart} setCart={setCart} />,
    cart: (
      <Cart
        cart={cart}
        setCart={setCart}
        updateCartQuantity={updateCartQuantity}
        removeFromCart={removeFromCart}
      />
    ),
    chatbot: <Chatbot />, // ✅ Added Chatbot page
    login: (
      <Login
        onLogin={handleLogin}
        onSwitchToSignup={() => setCurrentPage("signup")}
      />
    ),
    signup: (
      <Signup
        onSignup={handleLogin}
        onSwitchToLogin={() => setCurrentPage("login")}
      />
    ),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
        cart={cart}
        onShowAuth={() => setCurrentPage("login")}
      />

      <main className="pt-20">{pages[currentPage] || <NotFound />}</main>

      <Footer />
    </div>
  );
}

export default App;
