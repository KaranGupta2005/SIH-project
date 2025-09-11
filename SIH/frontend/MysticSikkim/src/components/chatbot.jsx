"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { X, Send, Sparkles, Mountain, MessageCircle } from "lucide-react";

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Namaste! Welcome to MysticSikkim AI 🌄. I'm here to guide you through the mystical beauty of Sikkim. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!res.ok) throw new Error("Failed to contact assistant");

      const data = await res.json();
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: data.reply || "No reply from assistant" },
        ]);
      }, 800);
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "⚠️ Error contacting assistant" },
        ]);
      }, 800);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-amber-500 via-yellow-600 to-orange-600 rounded-full shadow-xl flex items-center justify-center text-white hover:shadow-2xl hover:scale-110 transition-all duration-300 z-50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <MessageCircle size={28} />
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500 via-yellow-600 to-orange-600"
              animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatRef}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 right-0 h-[85vh] w-[400px] bg-gradient-to-br from-amber-900/95 via-orange-800/95 to-yellow-900/95 shadow-2xl rounded-l-3xl border border-amber-400/30 backdrop-blur-xl flex flex-col z-40 overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 text-white p-5 rounded-tl-3xl shadow-md flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/25 rounded-full flex items-center justify-center border border-white/20">
                <Mountain size={20} />
              </div>
              <h3 className="font-bold text-lg">MysticSikkim AI</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-white text-xl hover:text-yellow-300 transition-colors"
              >
                <X size={22} />
              </button>
              <motion.div
                className="absolute top-3 right-10 text-white/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={18} />
              </motion.div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-5 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-amber-400/50 scrollbar-track-transparent flex flex-col">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl max-w-[85%] text-sm shadow-md backdrop-blur-sm ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-amber-500/30 to-yellow-500/30 text-white self-end border border-amber-400/30"
                      : "bg-white/15 text-amber-100 border border-amber-400/25 self-start"
                  }`}
                >
                  {msg.sender === "bot" ? (
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex self-start p-3 rounded-2xl bg-white/15 border border-amber-400/25 shadow-md backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2.5 h-2.5 bg-amber-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                    <span className="text-sm text-amber-200 font-medium">
                      AI is thinking...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-amber-400/20 flex items-center bg-gradient-to-r from-amber-900/50 to-yellow-900/50">
              <input
                className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400/60 transition-all resize-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a sacred message..."
              />
              <motion.button
                onClick={sendMessage}
                whileTap={{ scale: 0.95 }}
                className="ml-3 px-5 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-2xl font-medium hover:scale-105 hover:shadow-lg hover:shadow-amber-500/40 transition-all flex items-center gap-2"
              >
                <Send size={16} /> Send
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrollbar */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(251, 191, 36, 0.5);
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </>
  );
}



