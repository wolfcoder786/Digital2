import React, { useState } from 'react';
import { Search, Zap, DollarSign, Wrench } from 'lucide-react';

const FarmingMachines = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const machines = [
    {
      name: 'Rotary Tiller',
      malayalam: 'റോട്ടറി ടില്ലർ',
      category: 'tillage',
      power: '7-15 HP',
      price: '₹50,000 - ₹1,20,000',
      uses: ['Soil preparation', 'Weed control', 'Stubble management'],
      features: ['Adjustable depth', 'Multiple blade options', 'Suitable for small farms'],
      image: '🚜',
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Paddy Transplanter',
      malayalam: 'നെൽ നടീൽ യന്ത്രം',
      category: 'planting',
      power: '8-12 HP',
      price: '₹80,000 - ₹1,50,000',
      uses: ['Rice transplanting', 'Uniform spacing', 'Labor saving'],
      features: ['4-6 rows capacity', 'Adjustable plant spacing', 'Mat-type seedling'],
      image: '🌾',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Power Weeder',
      malayalam: 'പവർ വീഡർ',
      category: 'weeding',
      power: '1.5-3 HP',
      price: '₹15,000 - ₹35,000',
      uses: ['Inter-cultivation', 'Weed control', 'Soil aeration'],
      features: ['Lightweight design', 'Easy operation', 'Multiple attachments'],
      image: '🔧',
      color: 'from-orange-500 to-orange-600'
    },
    {
      name: 'Mini Combine Harvester',
      malayalam: 'മിനി കമ്പൈൻ ഹാർവെസ്റ്റർ',
      category: 'harvesting',
      power: '20-35 HP',
      price: '₹8,00,000 - ₹15,00,000',
      uses: ['Grain harvesting', 'Threshing', 'Cleaning'],
      features: ['All-in-one operation', 'High efficiency', 'Grain tank capacity'],
      image: '🌽',
      color: 'from-red-500 to-red-600'
    },
    {
      name: 'Sprayer Pump',
      malayalam: 'സ്പ്രേയർ പമ്പ്',
      category: 'spraying',
      power: '2-5 HP',
      price: '₹8,000 - ₹25,000',
      uses: ['Pesticide application', 'Fertilizer spraying', 'Water spraying'],
      features: ['Adjustable nozzles', 'High pressure', 'Chemical resistant'],
      image: '💧',
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Seed Drill',
      malayalam: 'വിത്ത് വിതകൽ യന്ത്രം',
      category: 'planting',
      power: 'Tractor operated',
      price: '₹35,000 - ₹80,000',
      uses: ['Seed sowing', 'Fertilizer placement', 'Precise spacing'],
      features: ['Multi-crop capability', 'Metering mechanism', 'Depth control'],
      image: '🌱',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Machines', count: machines.length },
    { id: 'tillage', name: 'Tillage', count: machines.filter(m => m.category === 'tillage').length },
    { id: 'planting', name: 'Planting', count: machines.filter(m => m.category === 'planting').length },
    { id: 'weeding', name: 'Weeding', count: machines.filter(m => m.category === 'weeding').length },
    { id: 'harvesting', name: 'Harvesting', count: machines.filter(m => m.category === 'harvesting').length },
    { id: 'spraying', name: 'Spraying', count: machines.filter(m => m.category === 'spraying').length }
  ];

  const filteredMachines = machines.filter(machine => {
    const matchesSearch =
      machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.malayalam.includes(searchTerm) ||
      machine.uses.some(use => use.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || machine.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const subsidySchemes = [
    {
      scheme: 'Sub-Mission on Agricultural Mechanization (SMAM)',
      subsidy: 'Up to 50%',
      eligibility: 'All farmers',
      description: 'Financial assistance for purchasing farm machinery'
    },
    {
      scheme: 'Custom Hiring Centers',
      subsidy: 'Up to 80%',
      eligibility: 'FPOs, SHGs',
      description: 'Establishment of custom hiring centers'
    },
    {
      scheme: 'Kerala State Subsidy',
      subsidy: 'Up to 40%',
      eligibility: 'Kerala farmers',
      description: 'State government subsidy for farm mechanization'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Modern Farming Machines & Equipment
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive guide to modern agricultural machinery, their features, prices, and government subsidies
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search machines by name, use, or Malayalam name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Machines Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredMachines.map((machine, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{machine.image}</div>
                <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${machine.color} text-white`}>
                  <Wrench className="h-5 w-5" />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-1">{machine.name}</h3>
              <p className="text-blue-600 font-medium mb-3">{machine.malayalam}</p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center">
                    <Zap className="h-3 w-3 mr-1" />
                    Power
                  </span>
                  <span className="text-sm font-medium text-gray-900">{machine.power}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center">
                    <DollarSign className="h-3 w-3 mr-1" />
                    Price Range
                  </span>
                  <span className="text-sm font-medium text-green-600">{machine.price}</span>
                </div>

                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Primary Uses</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {machine.uses.map((use, useIndex) => (
                      <span key={useIndex} className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">
                        {use}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Key Features</span>
                  <ul className="text-xs text-gray-600 mt-1 space-y-1">
                    {machine.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <div className="w-1 h-1 bg-blue-500 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded-lg font-medium hover:from-blue-600 hover:to-green-600 transition-all text-sm">
                  View Details & Dealers
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Subsidy Information */}
        <div className="bg-gradient-to-r from-orange-500 via-white to-green-500 p-1 rounded-2xl mb-12">
          <div className="bg-white rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Government Subsidy Schemes</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {subsidySchemes.map((scheme, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-800 mb-2">{scheme.scheme}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subsidy:</span>
                      <span className="font-medium text-green-600">{scheme.subsidy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Eligibility:</span>
                      <span className="font-medium text-blue-600">{scheme.eligibility}</span>
                    </div>
                    <p className="text-gray-600 mt-3">{scheme.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="bg-gradient-to-r from-orange-500 to-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-green-600 transition-all shadow-md hover:shadow-lg">
                Apply for Subsidy
              </button>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Machine Selection Tips</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Assess Your Needs</h3>
              <p className="text-gray-600 text-sm">Consider farm size, crop type, and labor availability</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Compare Options</h3>
              <p className="text-gray-600 text-sm">Evaluate features, prices, and after-sales support</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Check Subsidies</h3>
              <p className="text-gray-600 text-sm">Explore government schemes and financial assistance</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold">4</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Plan Maintenance</h3>
              <p className="text-gray-600 text-sm">Ensure availability of spare parts and service centers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmingMachines;
