import React, { useState } from "react";

const Login = ({ onLogin, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("token", data.token);
      onLogin(data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-orange-500 via-white to-green-500">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border-t-8 border-orange-600">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          🇮🇳 Welcome Back, Farmer!
        </h2>

        {error && <p className="text-red-600 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orange-600 to-green-600 text-white rounded-lg font-semibold hover:opacity-90"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Don’t have an account?{" "}
          <button
            className="text-orange-600 font-semibold"
            onClick={onSwitchToSignup}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
