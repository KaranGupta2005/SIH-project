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
      {/* Floating AI Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white text-2xl hover:bg-blue-700 transition-transform hover:scale-110"
      >
        🤖
      </button>

      {/* Chat Container */}
      <div
        className={`fixed bottom-0 right-0 h-[80vh] w-80 bg-white shadow-2xl rounded-l-2xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="bg-blue-600 text-white font-semibold p-4 rounded-l-2xl">
          AI Assistant
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-0 right-4 text-white text-[30px] hover:text-gray-300"
          >
            &times;
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg max-w-[75%] text-sm ${
                msg.sender === "user"
                  ? "bg-blue-100 text-right self-end"
                  : "bg-gray-100 text-left self-start"
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

        {/* Input */}
        <div className="p-3 border-t flex">
          <input
            className="flex-1 p-2 border rounded-lg focus:outline-none text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
