import React, { useState } from "react";
import axios from "axios";
import { Bot, User, Languages } from "lucide-react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("en"); // "en" or "ml"

  // ✅ Send message to backend
  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message immediately
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await axios.post("http://localhost:8000/chat", {
        query: input,
        lang: lang,
      });

      const botMsg = {
        sender: "bot",
        text: res.data.answer || "🤖 No response",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const botMsg = {
        sender: "bot",
        text: "⚠️ Could not reach server. Try again later.",
      };
      setMessages((prev) => [...prev, botMsg]);
    }

    setInput("");
  };

  // ✅ Send on Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex flex-col h-[90vh] max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border">
      {/* 🔝 Header with Language Toggle */}
      <div className="flex justify-between items-center p-4 border-b bg-gray-100 rounded-t-2xl">
        <h2 className="text-lg font-bold text-gray-700 flex items-center gap-2">
          <Bot className="w-5 h-5 text-green-600" />
          Farmer’s AI Assistant
        </h2>

        {/* Language Slider */}
        <div className="flex items-center gap-2">
          <span className={`text-sm ${lang === "ml" ? "text-gray-400" : "text-gray-800 font-semibold"}`}>
            English
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={lang === "ml"}
              onChange={() => setLang(lang === "en" ? "ml" : "en")}
            />
            <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 relative transition-all">
              <div className="absolute top-1 left-1 peer-checked:left-7 w-5 h-5 bg-white rounded-full shadow transition-all"></div>
            </div>
          </label>
          <span className={`text-sm ${lang === "en" ? "text-gray-400" : "text-gray-800 font-semibold"}`}>
            മലയാളം
          </span>
        </div>
      </div>

      {/* 💬 Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-[15px]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "bot" ? (
              <div className="flex items-start gap-2 max-w-[75%]">
                <div className="bg-green-600 text-white p-3 rounded-2xl rounded-tl-none shadow-md">
                  {msg.text}
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2 max-w-[75%]">
                <div className="bg-gray-200 text-gray-800 p-3 rounded-2xl rounded-tr-none shadow-sm">
                  {msg.text}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ⌨️ Input Area */}
      <div className="p-4 border-t flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={lang === "en" ? "Type your message..." : "നിങ്ങളുടെ സന്ദേശം എഴുതുക..."}
          className="flex-1 border rounded-full px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
        />
        <button
          onClick={sendMessage}
          className="px-5 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
