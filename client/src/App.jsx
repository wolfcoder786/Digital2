import React, { useState, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/footer";
import StudyLearn from "./pages/StudyLearn";
// ✅ Lazy load heavy sections/pages
const Features = lazy(() => import("./components/features"));

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

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
    setCurrentPage("home");
  };

 const renderPageContent = () => {
  switch (currentPage) {
    case "home":
      return (
        <>
          <Hero onNavigate={handleNavigate} />
          <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
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
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-6">Pesticides Info 🧪</h1>
          <p className="text-gray-700">
            Learn about pesticide usage, safety guidelines, and best practices.
          </p>
        </div>
      );
    case "machines":
      return (
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-6">Farming Machines 🚜</h1>
          <p className="text-gray-700">
            Explore modern farming equipment and technology for efficient agriculture.
          </p>
        </div>
      );
    case "chatbot":
      return (
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-6">AI ChatBot 🤖</h1>
          <p className="text-gray-700">
            Ask questions in Malayalam or English and get instant AI-powered advice.
          </p>
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

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
