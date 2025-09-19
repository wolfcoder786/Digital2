// ChatBot.jsx
import React, { useState, useEffect, useRef } from "react";
import { Send, Mic, Camera, Bot, User, MapPin, Sun, Moon } from "lucide-react";

const MessageBubble = ({ message }) => {
  const isUser = message.sender === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
          isUser ? "flex-row-reverse space-x-reverse" : ""
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? "bg-blue-500" : "bg-green-500"
          }`}
        >
          {isUser ? (
            <User className="h-4 w-4 text-white" />
          ) : (
            <Bot className="h-4 w-4 text-white" />
          )}
        </div>
        <div
          className={`rounded-2xl px-4 py-2 ${
            isUser
              ? "bg-blue-500 text-white"
              : "bg-gray-100 dark:bg-gray-800 dark:text-gray-100"
          }`}
        >
          {message.image && (
            <img
              src={message.image}
              alt="Uploaded"
              className="max-w-full h-32 object-cover rounded-lg mb-2"
            />
          )}
          <p className="text-sm">{message.text}</p>
          <span
            className={`text-xs ${
              isUser ? "text-blue-100" : "text-gray-500"
            } block mt-1`}
          >
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

const ChatBot = ({ user }) => {
  const storageKey = `chatMessages_${user?._id || "guest"}`;
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ml");
  const [darkMode, setDarkMode] = useState(false);

  const recognitionRef = useRef(null);

  // Load chat history
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (user?._id) {
        try {
          const res = await fetch("http://localhost:5000/api/chat", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const data = await res.json();
          setMessages(
            data.length > 0
              ? data.map((msg) => ({
                  ...msg,
                  id: msg._id || Date.now().toString(),
                }))
              : [
                  {
                    id: "1",
                    text: `നമസ്കാരം ${
                      user?.name || "കർഷകാ"
                    }! I am your Digital Krishi Officer. How can I help you today?`,
                    sender: "bot",
                    timestamp: new Date(),
                  },
                ]
          );
        } catch (err) {
          console.error("Error fetching chat history:", err);
        }
      } else {
        const saved = localStorage.getItem(storageKey);
        setMessages(
          saved
            ? JSON.parse(saved)
            : [
                {
                  id: "1",
                  text: "Hello Guest! 👋 How can I help you today?",
                  sender: "bot",
                  timestamp: new Date(),
                },
              ]
        );
      }
    };
    fetchChatHistory();
  }, [user?._id]);

  // Save guest chat to localStorage
  useEffect(() => {
    if (!user?._id) {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, user?._id, storageKey]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Save message to backend
  const saveMessageToBackend = async (message) => {
    if (!user?._id) return;
    try {
      await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(message),
      });
    } catch (err) {
      console.error("Error saving chat:", err);
    }
  };

  // Get bot response
  const fetchBotResponse = async (userMessage) => {
    try {
      const res = await fetch("http://localhost:5000/api/chat/bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userMessage }),
      });
      const data = await res.json();
      return (
        data.response || "I did not understand that. Can you elaborate?"
      );
    } catch (err) {
      console.error("Error fetching bot response:", err);
      return "I did not understand that. Can you elaborate?";
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
      language: selectedLanguage,
    };

    setMessages((prev) => [...prev, newMessage]);
    saveMessageToBackend(newMessage);
    setInputText("");
    setIsTyping(true);

    const botText = user?._id
      ? await fetchBotResponse(inputText)
      : "I understand your question. Please give me more details.";
    const botMessage = {
      id: Date.now().toString() + 1,
      text: botText,
      sender: "bot",
      timestamp: new Date(),
      language: selectedLanguage,
    };
    setMessages((prev) => [...prev, botMessage]);
    saveMessageToBackend(botMessage);
    setIsTyping(false);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageMessage = {
        id: Date.now().toString(),
        text: "📷 Image uploaded",
        sender: "user",
        timestamp: new Date(),
        image: event.target.result,
      };
      setMessages((prev) => [...prev, imageMessage]);
      saveMessageToBackend(imageMessage);
    };
    reader.readAsDataURL(file);
  };

  // Setup speech recognition
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      console.warn("Speech Recognition API not supported.");
      return;
    }
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = selectedLanguage === "ml" ? "ml-IN" : "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsRecording(false);
    };
    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    return () => recognition.stop();
  }, [selectedLanguage]);

  // Start/stop recording
  const handleVoiceRecord = () => {
    if (!recognitionRef.current) return;
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  return (
    <div
      className={
        darkMode ? "dark min-h-screen bg-gray-900" : "min-h-screen bg-gray-50"
      }
    >
      <div className="max-w-4xl mx-auto px-4 pt-4">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-t-2xl border-b border-gray-200 p-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Digital Krishi Officer
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {user?.location || "Kerala"} • AI Assistant
              </p>
            </div>
          </div>
          {/* Language + Dark mode */}
          <div className="flex items-center space-x-2">
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setSelectedLanguage("ml")}
                className={`px-3 py-1 rounded-md text-xs font-medium ${
                  selectedLanguage === "ml"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                മലയാളം
              </button>
              <button
                onClick={() => setSelectedLanguage("en")}
                className={`px-3 py-1 rounded-md text-xs font-medium ${
                  selectedLanguage === "en"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                English
              </button>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="bg-white dark:bg-gray-800 h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2 flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white dark:bg-gray-800 rounded-b-2xl border-t border-gray-200 p-4 flex items-center space-x-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-300"
          >
            <Camera className="h-5 w-5" />
          </button>
          <button
            onClick={handleVoiceRecord}
            className={`p-2 ${
              isRecording
                ? "text-red-500"
                : "text-gray-500 dark:text-gray-300"
            }`}
          >
            <Mic className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your farming question..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="bg-gradient-to-r from-orange-500 to-green-500 text-white p-2 rounded-lg disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
