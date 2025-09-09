import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) throw new Error("Failed to contact assistant");

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply || "No reply from assistant" },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error contacting assistant" },
      ]);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full shadow-lg flex items-center justify-center text-white text-3xl hover:scale-110 hover:shadow-amber-500/50 transition-all duration-300 animate-bounce"
      >
        🤖
      </button>

      {/* Chat Container */}
      <div
        className={`fixed bottom-0 right-0 h-[80vh] w-96 bg-gradient-to-br from-amber-900/95 via-orange-800/95 to-yellow-900/95 shadow-2xl rounded-l-3xl border border-amber-400/20 backdrop-blur-xl transform transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold p-4 rounded-tl-3xl shadow-md">
          MysticSikkim AI
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-0 right-4 text-white text-[28px] hover:text-yellow-300 transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-amber-400/40 scrollbar-track-transparent">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed shadow-md backdrop-blur-sm ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-white self-end"
                  : "bg-white/10 text-amber-100 border border-amber-400/20 self-start"
              }`}
            >
              {msg.sender === "bot" ? (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              ) : (
                msg.text
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-amber-400/20 flex items-center bg-gradient-to-r from-amber-900/50 to-yellow-900/50">
          <input
            className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-amber-400/50 transition-all"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a sacred message..."
          />
          <button
            onClick={sendMessage}
            className="ml-3 px-5 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-2xl font-medium hover:scale-105 hover:shadow-lg hover:shadow-amber-500/40 transition-all"
          >
            ✨ Send
          </button>
        </div>
      </div>

      {/* Extra glow animation */}
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
