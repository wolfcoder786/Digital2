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
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Neem Oil',
      malayalam: 'വേപ്പെണ്ണ',
      type: 'Bio-Pesticide',
      crops: ['All crops', 'Vegetables', 'Fruits'],
      diseases: ['Aphids', 'Whitefly', 'Thrips'],
      dosage: '2-3 ml/liter',
      safety: 'Completely safe',
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Carbendazim',
      malayalam: 'കാർബെൻഡാസിം',
      type: 'Systemic Fungicide',
      crops: ['Rice', 'Wheat', 'Pulses'],
      diseases: ['Blast', 'Rust', 'Powdery mildew'],
      dosage: '1g/liter',
      safety: 'Moderate toxicity',
      color: 'from-orange-500 to-orange-600'
    },
    {
      name: 'Imidacloprid',
      malayalam: 'ഇമിഡാക്ലോപ്രിഡ്',
      type: 'Insecticide',
      crops: ['Cotton', 'Rice', 'Vegetables'],
      diseases: ['Brown planthopper', 'Aphids', 'Termites'],
      dosage: '0.3-0.5 ml/liter',
      safety: 'High toxicity',
      color: 'from-red-500 to-red-600'
    },
    {
      name: 'Trichoderma',
      malayalam: 'ട്രൈക്കോഡെർമ',
      type: 'Bio-Fungicide',
      crops: ['All crops', 'Soil treatment'],
      diseases: ['Root rot', 'Damping off', 'Wilt'],
      dosage: '5g/liter',
      safety: 'Completely safe',
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Mancozeb',
      malayalam: 'മാൻകോസെബ്',
      type: 'Contact Fungicide',
      crops: ['Potato', 'Grapes', 'Vegetables'],
      diseases: ['Late blight', 'Downy mildew'],
      dosage: '2-2.5g/liter',
      safety: 'Moderate toxicity',
      color: 'from-indigo-500 to-indigo-600'
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
      pesticide.crops.some(crop =>
        crop.toLowerCase().includes(searchTerm.toLowerCase())
      );

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
            Pesticide Information Guide
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive information about pesticides, their usage, safety measures, and best practices
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search pesticides, crops, or diseases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Safety Notice */}
        <div className="bg-gradient-to-r from-red-100 to-orange-100 border border-red-200 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">Important Safety Guidelines</h3>
              <div className="text-red-700 space-y-1 text-sm">
                <p>• Always read and follow label instructions before use</p>
                <p>• Wear protective equipment (gloves, mask, full-sleeve clothes)</p>
                <p>• Do not spray during windy conditions or in direct sunlight</p>
                <p>• Follow pre-harvest intervals strictly</p>
                <p>• Store pesticides safely away from children and food</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pesticides Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPesticides.map((pesticide, index) => (
            <div
              key={index}
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

              <h3 className="text-lg font-semibold text-gray-900 mb-1">{pesticide.name}</h3>
              <p className="text-blue-600 font-medium mb-3">{pesticide.malayalam}</p>

              <div className="space-y-3">
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Type</span>
                  <p className="text-sm text-gray-700">{pesticide.type}</p>
                </div>

                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Suitable Crops</span>
                  <p className="text-sm text-gray-700">{pesticide.crops.join(', ')}</p>
                </div>

                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Target Pests/Diseases</span>
                  <p className="text-sm text-gray-700">{pesticide.diseases.join(', ')}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Dosage</span>
                    <p className="text-sm font-medium text-gray-900">{pesticide.dosage}</p>
                  </div>
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Best Practices */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Best Practices for Pesticide Use
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Right Time</h3>
              <p className="text-gray-600 text-sm">
                Apply during early morning or evening hours when temperature is moderate
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Safety First</h3>
              <p className="text-gray-600 text-sm">
                Always use protective equipment and follow safety guidelines
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Integrated Approach</h3>
              <p className="text-gray-600 text-sm">
                Combine with biological control and cultural practices
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pesticides;
