import React from "react";
import { BookOpen, Video, Download, ExternalLink } from "lucide-react";

const StudyLearn = () => {
  const resources = [
    {
      title: "Crop Calendar for Kerala",
      description: "Complete seasonal farming guide for major crops in Kerala",
      type: "PDF Guide",
      language: "Malayalam/English",
      color: "from-green-500 to-green-600",
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      title: "Integrated Pest Management",
      description: "Learn IPM techniques for sustainable farming",
      type: "Video Series",
      language: "Malayalam",
      color: "from-blue-500 to-blue-600",
      icon: <Video className="h-6 w-6" />,
    },
    {
      title: "Organic Farming Methods",
      description: "Traditional and modern organic farming practices",
      type: "Interactive Guide",
      language: "Malayalam/English",
      color: "from-orange-500 to-orange-600",
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      title: "Weather-based Agriculture",
      description: "Climate-smart farming techniques and practices",
      type: "PDF Guide",
      language: "English",
      color: "from-purple-500 to-purple-600",
      icon: <Download className="h-6 w-6" />,
    },
  ];

  const categories = [
    {
      name: "Crop Production",
      topics: [
        "Paddy Cultivation",
        "Spice Farming",
        "Vegetable Gardening",
        "Fruit Cultivation",
      ],
      color: "bg-green-100 text-green-800",
    },
    {
      name: "Soil Management",
      topics: [
        "Soil Testing",
        "Fertilizer Application",
        "Organic Matter",
        "pH Management",
      ],
      color: "bg-orange-100 text-orange-800",
    },
    {
      name: "Water Management",
      topics: [
        "Irrigation Systems",
        "Water Conservation",
        "Drainage Systems",
        "Rainwater Harvesting",
      ],
      color: "bg-blue-100 text-blue-800",
    },
    {
      name: "Plant Protection",
      topics: [
        "Pest Identification",
        "Disease Management",
        "Biological Control",
        "Safe Pesticide Use",
      ],
      color: "bg-red-100 text-red-800",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Study & Learn Agricultural Practices
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive resources and guides to enhance your farming knowledge
            and skills
          </p>
        </div>

        {/* Featured Resources */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 group cursor-pointer"
            >
              <div
                className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${resource.color} text-white mb-4 group-hover:scale-110 transition-transform`}
              >
                {resource.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {resource.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {resource.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                  {resource.type}
                </span>
                <span className="text-xs text-blue-600">
                  {resource.language}
                </span>
              </div>
              <div className="mt-4 text-sm text-blue-600 group-hover:text-blue-800 transition-colors flex items-center">
                Access Now <ExternalLink className="h-3 w-3 ml-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Learning Categories */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Learning Categories
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${category.color}`}
                  >
                    {category.name}
                  </span>
                </div>
                <div className="space-y-2">
                  {category.topics.map((topic, topicIndex) => (
                    <div
                      key={topicIndex}
                      className="flex items-center text-gray-700 hover:text-blue-600 cursor-pointer transition-colors"
                    >
                      <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                      <span className="text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Malayalam Learning Resources */}
        <div className="bg-gradient-to-r from-orange-500 via-white to-green-500 p-1 rounded-2xl mb-12">
          <div className="bg-white rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Malayalam Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl mb-2">📚</div>
                <h3 className="font-semibold text-gray-800 mb-2">കൃഷി ഗൈഡ്</h3>
                <p className="text-sm text-gray-600">
                  Complete farming guide in Malayalam
                </p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl mb-2">🎥</div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  വീഡിയോ പാഠങ്ങൾ
                </h3>
                <p className="text-sm text-gray-600">
                  Video lessons by agricultural experts
                </p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl mb-2">📱</div>
                <h3 className="font-semibold text-gray-800 mb-2">മൊബൈൽ ആപ്പ്</h3>
                <p className="text-sm text-gray-600">
                  Mobile app for offline learning
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Learn More?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our community of farmers and access expert-curated content,
            interactive workshops, and personalized learning paths.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-orange-500 to-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-green-600 transition-all shadow-md hover:shadow-lg">
              Browse All Resources
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-green-500 hover:text-green-600 transition-colors">
              Download Mobile App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyLearn;
