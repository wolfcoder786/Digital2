import React, { useState } from "react";
import { Search, Shield, Leaf, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

const Pesticides = ({ cart, setCart, addToCart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const pesticides = [
    {
      id: 1,
      name: "Copper Oxychloride",
      malayalam: "കോപ്പർ ഓക്സിക്ലോറൈഡ്",
      type: "Fungicide",
      crops: ["Tomato", "Potato", "Banana", "Coconut"],
      diseases: ["Leaf spot", "Blight", "Anthracnose"],
      dosage: "0.3% solution",
      safety: "Low toxicity",
      color: "from-blue-500 to-blue-600",
      price: 350,
    },
    {
      id: 2,
      name: "Neem Oil",
      malayalam: "വേപ്പെണ്ണ",
      type: "Bio-Pesticide",
      crops: ["All crops", "Vegetables", "Fruits"],
      diseases: ["Aphids", "Whitefly", "Thrips"],
      dosage: "2-3 ml/liter",
      safety: "Completely safe",
      color: "from-green-500 to-green-600",
      price: 220,
    },
    {
      id: 3,
      name: "Carbendazim",
      malayalam: "കാർബെൻഡാസിം",
      type: "Systemic Fungicide",
      crops: ["Rice", "Wheat", "Pulses"],
      diseases: ["Blast", "Rust", "Powdery mildew"],
      dosage: "1g/liter",
      safety: "Moderate toxicity",
      color: "from-orange-500 to-orange-600",
      price: 180,
    },
    {
      id: 4,
      name: "Imidacloprid",
      malayalam: "ഇമിഡാക്ലോപ്രിഡ്",
      type: "Insecticide",
      crops: ["Cotton", "Rice", "Vegetables"],
      diseases: ["Brown planthopper", "Aphids", "Termites"],
      dosage: "0.3-0.5 ml/liter",
      safety: "High toxicity",
      color: "from-red-500 to-red-600",
      price: 500,
    },
    {
      id: 5,
      name: "Trichoderma",
      malayalam: "ട്രൈക്കോഡെർമ",
      type: "Bio-Fungicide",
      crops: ["All crops", "Soil treatment"],
      diseases: ["Root rot", "Damping off", "Wilt"],
      dosage: "5g/liter",
      safety: "Completely safe",
      color: "from-purple-500 to-purple-600",
      price: 260,
    },
    {
      id: 6,
      name: "Mancozeb",
      malayalam: "മാൻകോസെബ്",
      type: "Contact Fungicide",
      crops: ["Potato", "Grapes", "Vegetables"],
      diseases: ["Late blight", "Downy mildew"],
      dosage: "2-2.5g/liter",
      safety: "Moderate toxicity",
      color: "from-indigo-500 to-indigo-600",
      price: 300,
    },
  ];

  const categories = [
    { id: "all", name: "All Pesticides", count: pesticides.length },
    {
      id: "bio",
      name: "Bio-Pesticides",
      count: pesticides.filter((p) => p.type.includes("Bio")).length,
    },
    {
      id: "fungicide",
      name: "Fungicides",
      count: pesticides.filter((p) => p.type.includes("Fungicide")).length,
    },
    {
      id: "insecticide",
      name: "Insecticides",
      count: pesticides.filter((p) => p.type.includes("Insecticide")).length,
    },
  ];

  const filteredPesticides = pesticides.filter((pesticide) => {
    const matchesSearch =
      pesticide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pesticide.malayalam.includes(searchTerm) ||
      pesticide.crops.some((crop) =>
        crop.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "bio" && pesticide.type.includes("Bio")) ||
      (selectedCategory === "fungicide" && pesticide.type.includes("Fungicide")) ||
      (selectedCategory === "insecticide" &&
        pesticide.type.includes("Insecticide"));

    return matchesSearch && matchesCategory;
  });

  const getSafetyColor = (safety) => {
    if (safety.includes("Completely safe"))
      return "text-green-600 bg-green-100";
    if (safety.includes("Low toxicity")) return "text-blue-600 bg-blue-100";
    if (safety.includes("Moderate toxicity"))
      return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="text-center flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Pesticide Marketplace
            </h1>
            <p className="text-lg text-gray-600">
              Buy safe & verified pesticides for your crops 🌱
            </p>
          </div>
          <div className="ml-4 flex items-center space-x-2">
            <ShoppingCart className="h-7 w-7 text-green-600" />
            <span className="text-sm font-medium">
              {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)} items
            </span>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search pesticides by name, crop, or disease..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex space-x-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    selectedCategory === category.id
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pesticides Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPesticides.map((pesticide) => (
            <div
              key={pesticide.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${pesticide.color} text-white`}
                >
                  <Leaf className="h-5 w-5" />
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getSafetyColor(
                    pesticide.safety
                  )}`}
                >
                  <Shield className="inline h-3 w-3 mr-1" />
                  {pesticide.safety}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {pesticide.name}
              </h3>
              <p className="text-blue-600 font-medium mb-3">
                {pesticide.malayalam}
              </p>

              <p className="text-xl font-bold text-green-600 mb-4">
                ₹{pesticide.price}
              </p>

              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <p>
                  <span className="font-medium">Type:</span> {pesticide.type}
                </p>
                <p>
                  <span className="font-medium">Crops:</span>{" "}
                  {pesticide.crops.join(", ")}
                </p>
                <p>
                  <span className="font-medium">Diseases:</span>{" "}
                  {pesticide.diseases.join(", ")}
                </p>
                <p>
                  <span className="font-medium">Dosage:</span> {pesticide.dosage}
                </p>
              </div>

              <button
                onClick={() => {
                  addToCart(pesticide); // use parent function
                  toast.success(`${pesticide.name} added to cart 🛒`, {
                    style: {
                      borderRadius: "10px",
                      background: "#fff",
                      color: "#16a34a",
                      fontWeight: "600",
                      padding: "12px 16px",
                    },
                    icon: "🌱",
                  });
                }}
                className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pesticides;
