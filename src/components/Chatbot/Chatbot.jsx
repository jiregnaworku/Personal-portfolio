import React, { useState, useRef, useEffect } from "react";
import { FaRobot } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatbotMessages");
    return saved ? JSON.parse(saved) : [];
  });
  const [typing, setTyping] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(() => {
    const saved = localStorage.getItem("chatbotCategory");
    return saved ? JSON.parse(saved) : null;
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const faqData = {
    "About Me": {
      "Who am I?":
        "I'm Jiregna Worku, a 4th-year Software Engineering student at Injibara University...",
      "What do I do?":
        "I build modern, scalable web and mobile applications with React, Next.js, Flutter, NestJS, etc...",
      "Skills?":
        "Frontend: ReactJS, NextJs, JS, HTML & CSS and more related popular frameworks. Backend: Node.js, Express, NestJS. Mobile: React Native, Flutter.",
      "Achievements?":
        "Built Website's and Apps like Online Coffee Shop and Kids Learning App.",
    },
    Projects: {
      "Latest Project?": "My portfolio website — including this chatbot.",
      "Upcoming Projects?": "An House rental system (web + mobile).",
      "Completed Projects?":
        "3+ apps including Coffee Shop, Kids Learning, and chatbot projects.",
    },
    "Contact Jiregna": {
      "Phone Number?":
        "📞 <a href='tel:+251918348141' class='text-indigo-600 underline'>+251 918 348 141</a>",
      "Telegram?":
        "📲 <a href='https://t.me/jiroow' target='_blank' rel='noopener noreferrer' class='text-indigo-600 underline'>@jiroow</a>",
      "Email?":
        "✉️ <a href='mailto:jiregna123w@gmail.com' class='text-indigo-600 underline'>jiregna123w@gmail.com</a>",
      "GitHub?":
        "💻 <a href='https://github.com/jiregnaworku' target='_blank' rel='noopener noreferrer' class='text-indigo-600 underline'>github.com/jiregnaworku</a>",
      "Location?": "📍 Addis Ababa, Ethiopia",
    },
    Resume: {
      "Download?": "📑 You can download my resume from the Resume page.",
    },
  };

  // Flatten all FAQs for search
  const allFAQs = Object.entries(faqData).flatMap(([category, qs]) =>
    Object.entries(qs).map(([q, a]) => ({ category, q, a }))
  );

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("chatbotMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("chatbotCategory", JSON.stringify(currentCategory));
  }, [currentCategory]);

  const toggleChat = () => {
    const newOpen = !isOpen;
    setIsOpen(newOpen);

    if (newOpen && messages.length === 0) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages([
          {
            sender: "bot",
            text: "👋 Hi! I'm Jiregna's chatbot. Choose a category below to learn more about me:",
          },
        ]);
      }, 600);
    }
  };

  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  const handleCategorySelect = (category) => {
    addMessage("user", category);
    setCurrentCategory(category);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      addMessage("bot", `Here are some questions about ${category}.`);
    }, 600);
  };

  const handleQuestionSelect = (question) => {
    addMessage("user", question);
    const answer = faqData[currentCategory][question];
    typeAnswer(answer);
  };

  const typeAnswer = (answer) => {
    setTyping(true);
    let index = 0;
    let text = "";

    const interval = setInterval(() => {
      text += answer[index];
      index++;
      if (index === answer.length) {
        clearInterval(interval);
        setTyping(false);
      }
      setMessages((prev) => {
        const lastMsg = prev[prev.length - 1];
        if (lastMsg?.sender === "bot" && lastMsg?.isTyping) {
          return [
            ...prev.slice(0, -1),
            { sender: "bot", text, isTyping: true },
          ];
        }
        return [...prev, { sender: "bot", text, isTyping: true }];
      });
    }, 25);
  };

  // 🔹 Search handling
  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const query = input.trim();
    addMessage("user", query);
    setInput("");

    // Find exact match
    const exact = allFAQs.find(
      (f) => f.q.toLowerCase() === query.toLowerCase()
    );
    if (exact) {
      typeAnswer(exact.a);
      return;
    }

    // Find closest match
    const bestMatch = allFAQs.find((f) =>
      f.q.toLowerCase().includes(query.toLowerCase())
    );

    if (bestMatch) {
      addMessage(
        "bot",
        `❓ I couldn’t find an exact answer. Did you mean: <button onclick="window.__chatbotSuggest('${bestMatch.q}')"
         class='px-2 py-1 bg-indigo-500 text-white rounded text-xs hover:bg-indigo-400 transition'>${bestMatch.q}</button>?`
      );
      // helper for onclick
      window.__chatbotSuggest = (q) => handleQuestionSelect(q);
    } else {
      addMessage("bot", "🤔 Sorry, I don’t have an answer for that.");
    }
  };

  // 🔹 Clear Chat
  const clearChat = () => setShowConfirm(true);
  const confirmClear = () => {
    setMessages([]);
    setCurrentCategory(null);
    localStorage.removeItem("chatbotMessages");
    localStorage.removeItem("chatbotCategory");
    setShowConfirm(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Button */}
      <motion.button
        onClick={toggleChat}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-5 rounded-full shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center"
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <FaRobot className="text-3xl" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            transition={{ duration: 0.3 }}
            className="backdrop-blur-xl bg-white/80 rounded-2xl shadow-2xl w-full max-w-md h-[75vh] mt-3 flex flex-col border border-gray-200"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex justify-between items-center p-4 rounded-t-2xl shadow">
              <span className="font-semibold text-lg">
                🤖 Jiregna’s Assistant bot
              </span>
              <div className="flex gap-2">
                <button
                  onClick={clearChat}
                  className="bg-red-500 px-3 py-1 rounded-full text-xs hover:bg-red-400 transition"
                >
                  Clear
                </button>
                <button
                  onClick={toggleChat}
                  className="text-white text-lg hover:text-gray-200 transition"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-end gap-2 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-8 h-8 flex items-center justify-center bg-indigo-500 text-white rounded-full shadow">
                      🤖
                    </div>
                  )}
                  <div
                    className={`px-4 py-2 rounded-2xl shadow max-w-[75%] text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />
                  {msg.sender === "user" && (
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-300 text-gray-800 rounded-full shadow">
                      🙂
                    </div>
                  )}
                </motion.div>
              ))}
              {typing && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center bg-indigo-500 text-white rounded-full shadow">
                    🤖
                  </div>
                  <div className="px-4 py-2 rounded-2xl bg-gray-200 text-gray-800 animate-pulse">
                    ✍️ Typing...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Footer with options + input */}
            <form
              onSubmit={handleInputSubmit}
              className="p-3 border-t bg-white/70 backdrop-blur flex flex-col gap-2"
            >
              <div className="flex flex-wrap gap-2">
                {!currentCategory &&
                  Object.keys(faqData).map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleCategorySelect(category)}
                      className="px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-xs shadow hover:scale-105 transition"
                    >
                      {category}
                    </button>
                  ))}

                {currentCategory && (
                  <>
                    <button
                      type="button"
                      onClick={() => setCurrentCategory(null)}
                      className="px-4 py-1.5 bg-red-500 text-white rounded-full text-xs shadow hover:scale-105 transition"
                    >
                      ⬅ Back
                    </button>
                    {Object.keys(faqData[currentCategory]).map((q) => (
                      <button
                        type="button"
                        key={q}
                        onClick={() => handleQuestionSelect(q)}
                        className="px-4 py-1.5 bg-gray-200 text-gray-800 rounded-full text-xs shadow hover:bg-gray-300 hover:scale-105 transition"
                      >
                        {q}
                      </button>
                    ))}
                  </>
                )}
              </div>

              {/* Input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 text-sm"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow hover:scale-105 transition"
                >
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 Confirmation Popup */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[60]">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center"
          >
            <h2 className="text-lg font-semibold mb-4">
              Clear the chat history?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmClear}
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-400 transition"
              >
                Yes, Clear
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
