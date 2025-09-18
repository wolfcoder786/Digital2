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
// 👇 Import AI Chatbot Page
// import Chatbot from "./pages/Chatbot.jsx"; 

const Features = lazy(() => import("./components/Features.jsx"));

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

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleNavigate = (page) => {
    // 🔒 Restrict AI Chatbot page if not logged in
    if (page === "chatbot" && !isAuthenticated) {
      setCurrentPage("login"); 
      return;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setCurrentPage("home"); // ✅ Stay on main page after login
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCart([]);
    localStorage.removeItem("cart");
    setCurrentPage("home"); // ✅ After logout, go back to homepage
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case "home":
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <Suspense fallback={<div className="text-center py-12">Loading features...</div>}>
              <Features />
            </Suspense>
          </>
        );
      case "study":
        return <StudyLearn />;
      case "pesticides":
        return <Pesticides cart={cart} setCart={setCart} />;
      case "machines":
        return <FarmingMachines cart={cart} setCart={setCart} />;
      case "cart":
        return <Cart cart={cart} setCart={setCart} />;
      case "chatbot":
        return isAuthenticated ? <Chatbot user={user} /> : <Login onLogin={handleLogin} onSwitchToSignup={() => setCurrentPage("signup")} />;
      case "login":
        return <Login onLogin={handleLogin} onSwitchToSignup={() => setCurrentPage("signup")} />;
      case "signup":
        return <Signup onSignup={handleLogin} onSwitchToLogin={() => setCurrentPage("login")} />;
      default:
        return <div className="text-center py-12">Page Not Found ❌</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Navbar always visible */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
        cart={cart}
        onShowAuth={() => setCurrentPage("login")}
      />

      <main className="pt-20">{renderPageContent()}</main>

      <Footer />
    </div>
  );
}

export default App;
