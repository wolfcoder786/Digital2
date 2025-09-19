import React, { useState, useRef, useEffect } from "react";
import { Send, Users, Cpu } from "lucide-react";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("en"); // 'en' or 'ml'
  const chatEndRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { type: "user", text: input, language };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Mock AI response after a delay
    setTimeout(() => {
      const botReply = {
        type: "bot",
        text:
          language === "en"
            ? `AI Response for: "${userMsg.text}"`
            : `AI പ്രതികരണം: "${userMsg.text}"`,
        language,
      };
      setMessages((prev) => [...prev, botReply]);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            AI Farming Assistant 🤖
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ask questions in Malayalam or English and get instant farming guidance.
          </p>
        </div>

        {/* Chat Container */}
        <div className="relative bg-white rounded-2xl shadow-lg p-6 flex flex-col h-[60vh] md:h-[70vh] overflow-hidden">
          {/* Language Toggle Slider */}
          <div className="absolute top-4 right-4 flex items-center space-x-2 bg-gray-100 rounded-full p-1 shadow-inner select-none">
            <span
              onClick={() => setLanguage("ml")}
              className={`px-3 py-1 rounded-full cursor-pointer transition-all ${
                language === "ml"
                  ? "bg-green-500 text-white font-semibold"
                  : "text-gray-700"
              }`}
            >
              മലയാളം
            </span>
            <span
              onClick={() => setLanguage("en")}
              className={`px-3 py-1 rounded-full cursor-pointer transition-all ${
                language === "en"
                  ? "bg-green-500 text-white font-semibold"
                  : "text-gray-700"
              }`}
            >
              English
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4">
            {messages.length === 0 && (
              <p className="text-gray-400 text-center mt-12">
                Start the conversation by typing your question below...
              </p>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-xl shadow ${
                    msg.type === "user"
                      ? "bg-green-500 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {msg.type === "user" ? (
                      <Users className="h-4 w-4 opacity-50" />
                    ) : (
                      <Cpu className="h-4 w-4 opacity-50" />
                    )}
                    <span>{msg.text}</span>
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="mt-4 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your question here..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              onClick={handleSend}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition-colors flex items-center gap-1"
            >
              Send <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-6 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">
            Quick Tips
          </h2>
          <p className="text-gray-700 text-sm text-center">
            Ask about crop diseases, pest control, irrigation tips, fertilizer usage,
            and more. The AI supports both English and Malayalam queries.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
