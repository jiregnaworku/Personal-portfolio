import React, { useState, useRef, useEffect } from "react";
import { FaRobot } from "react-icons/fa";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const chatEndRef = useRef(null);

  const faqData = {
    "About Me": {
      "Who am I?":
        "I'm Jiregna Worku, a 4th-year Software Engineering student at Injibara University. I specialize in creating visually appealing and user-friendly web and mobile applications. With a strong foundation in React, JavaScript, Node.js, and modern UI/UX practices, I enjoy solving problems and building products that make a difference..",
      "What do I do?":
        "I build modern, scalable web and mobile applications with HTML & CSS, JavaScript, ReactNative,  React, Next.js, Flutter, NestJS and more related technologies.",
      "Skills?":
        "Frontend: React, NextJs, JavaScript, HTML, CSS. Backend: Node.js, Express.js, NestJS, MongoDB, PostgreSQL. Mobile: React Native, Flutter. Tools: Git, Docker, Figma.",
      "Achievements?":
        "Built web and mobile applications including Online Coffee Shop and Kids Learning App.",
    },
    Projects: {
      "Latest Project?":
        "My personal portfolio website — designed to showcase my work and skills including this chat-bot.",
      "Upcoming Projects?":
        "A new AI-driven House rental system in website and mobile application by using react and react native frame works.",
      "Completed Projects?":
        "3+ apps including a Coffee Shop ordering Website, Kids Learning App, and community chatbot projects.",
    },
    "Contact Jiregna": {
      "Phone Number?": "📞 +251 918 348 141",
      "Telegram?": "📲 @jiroow",
      "Email?": "✉️ jiregna123w@gmail.com",
      "GitHub?": "💻 github.com/jiregnaworku",
      "Location?": "📍 Addis Ababa, Ethiopia",
    },
    Resume: {
      "Download?":
        "📑 You can download my resume from the Resume page on this portfolio.",
    },
  };

  // auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const toggleChat = () => {
    const newOpen = !isOpen;
    setIsOpen(newOpen);
    setMessages([]);
    setCurrentCategory(null);

    if (!isOpen) {
      // show intro when opening
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages([
          {
            sender: "bot",
            text: "👋 Hi! I'm Jiregna's chatbot. Choose a category below to learn more about me, I can assist you with what you need:",
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
    }, 30);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="bg-indigo-600 text-white p-4 rounded-full shadow-xl hover:bg-indigo-500 transition-all duration-300 flex items-center justify-center animate-bounce"
      >
        <FaRobot className="text-2xl" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[70vh] mt-3 flex flex-col transition-all duration-300">
          {/* Header */}
          <div className="sticky top-0 bg-indigo-600 text-white flex justify-between items-center p-3 rounded-t-2xl">
            <span className="font-semibold">Jiregna’s Chatbot</span>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200 transition"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg shadow ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 animate-pulse">
                  ✍️ Typing...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Footer with dynamic options */}
          <div className="p-3 border-t bg-gray-50 flex flex-wrap gap-2">
            {!currentCategory &&
              Object.keys(faqData).map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className="bg-indigo-500 text-white py-1 px-3 rounded-full shadow hover:bg-indigo-400 text-sm transition-all"
                >
                  {category}
                </button>
              ))}

            {currentCategory && (
              <>
                <button
                  onClick={() => setCurrentCategory(null)}
                  className="bg-red-500 text-white py-1 px-3 rounded-full shadow hover:bg-red-400 text-sm transition"
                >
                  ⬅ Back to Categories
                </button>
                {Object.keys(faqData[currentCategory]).map((q) => (
                  <button
                    key={q}
                    onClick={() => handleQuestionSelect(q)}
                    className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full hover:bg-gray-300 text-sm transition"
                  >
                    {q}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
