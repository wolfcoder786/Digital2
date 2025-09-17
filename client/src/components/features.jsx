import React from 'react';
import { 
  MessageCircle, 
  Camera, 
  Mic, 
  Brain, 
  MapPin, 
  Users,
  TrendingUp,
  Shield
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Natural Language Queries",
      description: "Ask questions in Malayalam or English using simple, everyday language",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: "Image Analysis",
      description: "Upload photos of diseased crops for instant diagnosis and treatment advice",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Mic className="h-8 w-8" />,
      title: "Voice Support",
      description: "Speak your questions naturally - perfect for farmers with limited literacy",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Intelligence",
      description: "Advanced machine learning models trained on agricultural datasets",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Location-Aware Advice",
      description: "Personalized recommendations based on your region, climate, and season",
      color: "from-red-500 to-red-600"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Escalation",
      description: "Complex queries are forwarded to local agricultural officers",
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Continuous Learning",
      description: "System improves with every interaction and expert feedback",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Reliable & Accurate",
      description: "Verified information from trusted agricultural sources and research",
      color: "from-green-600 to-blue-600"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Revolutionary Features for Modern Farming
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform brings cutting-edge technology to traditional farming, 
            making expert agricultural advice accessible to every farmer across India.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
            >
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Impact Section */}
        <div className="mt-20 bg-gradient-to-r from-orange-500 via-white to-green-500 p-1 rounded-2xl">
          <div className="bg-white rounded-xl p-8 sm:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Expected Impact
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Transforming Indian agriculture through accessible AI-powered advisory services
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">🎯</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Instant Access</h4>
                <p className="text-gray-600 text-sm">Expert-level farming advice available 24/7 to all farmers</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">🌉</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Bridge Communication</h4>
                <p className="text-gray-600 text-sm">Connects farmers directly with extension systems</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">🏢</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Support Krishibhavans</h4>
                <p className="text-gray-600 text-sm">Automates first-level support for agricultural departments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
