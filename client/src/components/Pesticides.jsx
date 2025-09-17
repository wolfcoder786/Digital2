// components/Pesticides.jsx
import React, { useState } from 'react';
import { Search, AlertTriangle, Shield, Leaf, Clock } from 'lucide-react';

const Pesticides = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const pesticides = [
    {
      name: 'Copper Oxychloride',
      malayalam: 'കോപ്പർ ഓക്സിക്ലോറൈഡ്',
      type: 'Fungicide',
      crops: ['Tomato', 'Potato', 'Banana', 'Coconut'],
      diseases: ['Leaf spot', 'Blight', 'Anthracnose'],
      dosage: '0.3% solution',
      safety: 'Low toxicity',
      color: 'from-blue-500 to-blue-600',
      price: 250
    },
    {
      name: 'Neem Oil',
      malayalam: 'വേപ്പെണ്ണ',
      type: 'Bio-Pesticide',
      crops: ['All crops', 'Vegetables', 'Fruits'],
      diseases: ['Aphids', 'Whitefly', 'Thrips'],
      dosage: '2-3 ml/liter',
      safety: 'Completely safe',
      color: 'from-green-500 to-green-600',
      price: 180
    },
    {
      name: 'Carbendazim',
      malayalam: 'കാർബെൻഡാസിം',
      type: 'Systemic Fungicide',
      crops: ['Rice', 'Wheat', 'Pulses'],
      diseases: ['Blast', 'Rust', 'Powdery mildew'],
      dosage: '1g/liter',
      safety: 'Moderate toxicity',
      color: 'from-orange-500 to-orange-600',
      price: 320
    },
    {
      name: 'Imidacloprid',
      malayalam: 'ഇമിഡാക്ലോപ്രിഡ്',
      type: 'Insecticide',
      crops: ['Cotton', 'Rice', 'Vegetables'],
      diseases: ['Brown planthopper', 'Aphids', 'Termites'],
      dosage: '0.3-0.5 ml/liter',
      safety: 'High toxicity',
      color: 'from-red-500 to-red-600',
      price: 450
    },
    {
      name: 'Trichoderma',
      malayalam: 'ട്രൈക്കോഡെർമ',
      type: 'Bio-Fungicide',
      crops: ['All crops', 'Soil treatment'],
      diseases: ['Root rot', 'Damping off', 'Wilt'],
      dosage: '5g/liter',
      safety: 'Completely safe',
      color: 'from-purple-500 to-purple-600',
      price: 200
    },
    {
      name: 'Mancozeb',
      malayalam: 'മാൻകോസെബ്',
      type: 'Contact Fungicide',
      crops: ['Potato', 'Grapes', 'Vegetables'],
      diseases: ['Late blight', 'Downy mildew'],
      dosage: '2-2.5g/liter',
      safety: 'Moderate toxicity',
      color: 'from-indigo-500 to-indigo-600',
      price: 280
    }
  ];

  const categories = [
    { id: 'all', name: 'All Pesticides', count: pesticides.length },
    { id: 'bio', name: 'Bio-Pesticides', count: pesticides.filter(p => p.type.includes('Bio')).length },
    { id: 'fungicide', name: 'Fungicides', count: pesticides.filter(p => p.type.includes('Fungicide')).length },
    { id: 'insecticide', name: 'Insecticides', count: pesticides.filter(p => p.type.includes('Insecticide')).length }
  ];

  const filteredPesticides = pesticides.filter(pesticide => {
    const matchesSearch =
      pesticide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pesticide.malayalam.includes(searchTerm) ||
      pesticide.crops.some(crop => crop.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'bio' && pesticide.type.includes('Bio')) ||
      (selectedCategory === 'fungicide' && pesticide.type.includes('Fungicide')) ||
      (selectedCategory === 'insecticide' && pesticide.type.includes('Insecticide'));

    return matchesSearch && matchesCategory;
  });

  const getSafetyColor = (safety) => {
    if (safety.includes('Completely safe')) return 'text-green-600 bg-green-100';
    if (safety.includes('Low toxicity')) return 'text-blue-600 bg-blue-100';
    if (safety.includes('Moderate toxicity')) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Pesticide Information & Marketplace
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn about pesticides, their usage, safety guidelines — and buy directly from trusted suppliers
          </p>
        </div>

        {/* Search + Filter (unchanged) */}
        {/* ... keep same code as before ... */}

        {/* Pesticides Grid with Price + Buy Button */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPesticides.map((pesticide, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col"
            >
              {/* Header Icons */}
              <div className="flex items-center justify-between mb-4">
                <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${pesticide.color} text-white`}>
                  <Leaf className="h-5 w-5" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSafetyColor(pesticide.safety)}`}>
                  <Shield className="inline h-3 w-3 mr-1" />
                  {pesticide.safety}
                </span>
              </div>

              {/* Info */}
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{pesticide.name}</h3>
              <p className="text-blue-600 font-medium mb-3">{pesticide.malayalam}</p>

              <div className="space-y-2 flex-1">
                <p className="text-sm text-gray-700"><strong>Type:</strong> {pesticide.type}</p>
                <p className="text-sm text-gray-700"><strong>Crops:</strong> {pesticide.crops.join(', ')}</p>
                <p className="text-sm text-gray-700"><strong>Diseases:</strong> {pesticide.diseases.join(', ')}</p>
                <p className="text-sm text-gray-700"><strong>Dosage:</strong> {pesticide.dosage}</p>
              </div>

              {/* Price + Buy Button */}
              <div className="mt-4 border-t pt-3">
                <p className="text-lg font-bold text-green-700 mb-3">₹ {pesticide.price}</p>
                <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Pesticides;
