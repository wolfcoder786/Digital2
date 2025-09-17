import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleLogin = () => {
    // Fake login (replace with real auth logic later)
    setIsAuthenticated(true);
    setUser({ name: "Farmer Ram" });
    setCurrentPage("home"); // Redirect to home after login
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentPage("home");
  };

  // Component to render page content dynamically
  const renderPageContent = () => {
    switch (currentPage) {
      case "home":
        return <Hero onNavigate={handleNavigate} />;
      case "study":
        return (
          <div className="max-w-5xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-6">Study & Learn 📖</h1>
            <p className="text-gray-700">Access comprehensive agricultural resources, tutorials, and guides.</p>
          </div>
        );
      case "pesticides":
        return (
          <div className="max-w-5xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-6">Pesticides Info 🧪</h1>
            <p className="text-gray-700">Learn about pesticide usage, safety guidelines, and best practices.</p>
          </div>
        );
      case "machines":
        return (
          <div className="max-w-5xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-6">Farming Machines 🚜</h1>
            <p className="text-gray-700">Explore modern farming equipment and technology for efficient agriculture.</p>
          </div>
        );
      case "chatbot":
        return (
          <div className="max-w-5xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-6">AI ChatBot 🤖</h1>
            <p className="text-gray-700">Ask questions in Malayalam or English and get instant AI-powered advice.</p>
          </div>
        );
      default:
        return (
          <div className="max-w-5xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-6">Page Not Found ❌</h1>
          </div>
        );
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
      />

      {/* Page Content */}
      <main className="pt-20">{renderPageContent()}</main>
    </div>
  );
}

export default App;
