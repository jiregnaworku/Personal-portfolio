import React, { useState, useRef, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaRobot } from "react-icons/fa";
import { getCurrentPageKnowledge } from "../../utils/websiteKnowledge";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm here to help you learn about Jiregna's portfolio. Ask me anything about his skills, projects, or experience!",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    // Add a typing indicator
    const typingIndicator = { text: "typing", sender: "typing" };
    setMessages((prev) => [...prev, typingIndicator]);

    setInput("");

    try {
      // Get page context
      console.log("Getting page knowledge...");
      const pageKnowledge = await getCurrentPageKnowledge();
      const context = pageKnowledge.join("\n").substring(0, 1000);
      console.log("Page context length:", context.length);

      // Get structured content for the system prompt
      const structuredContent = await getCurrentPageKnowledge();
      const pageTitle = document.title
        .replace(/- Personal Portfolio$/, "")
        .trim();

      console.log("Sending request to backend...");
      const response = await fetch(
        "https://chatbot-backend-6xrw.onrender.com/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  `You are an AI assistant for ${
                    pageTitle || "a portfolio website"
                  }. \
You should answer questions based on the following information about the portfolio owner. \
Be concise and helpful. If you don't know the answer, say so.\n\n` +
                  `PORTFOLIO CONTEXT:\n${structuredContent.join("\n")}\n\n` +
                  `GUIDELINES:\n` +
                  `- Keep responses concise and to the point\n` +
                  `- Only answer questions about the portfolio owner, their skills, projects, and experience\n` +
                  `- Be professional but friendly in your responses\n` +
                  `- If asked about skills or projects, list the most relevant ones from the context\n` +
                  `- For contact information, only provide what's explicitly mentioned in the context\n` +
                  `- If someone just says "hey" or "hello", give a brief, friendly greeting like "Hey! How can I help you learn about Jiregna's work?"\n` +
                  `- Match the tone and length of the user's message\n` +
                  `- Don't provide information unless specifically asked\n` +
                  `- When asked about projects, mention the specific projects listed in the context\n` +
                  `- When asked about skills, mention the specific skills listed in the context`,
              },
              {
                role: "user",
                content: input,
              },
            ],
            max_tokens: 300,
            temperature: 0.7,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Backend API Error:", errorData);
        throw new Error(
          errorData.error?.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Response from backend:", data);

      if (!data.choices?.[0]?.message?.content) {
        throw new Error("Unexpected response format from backend");
      }

      // Extract and clean the AI's response
      const aiResponse = data.choices[0].message.content.trim();
      console.log("AI Response:", aiResponse);

      // Remove the typing indicator
      setMessages((prev) => prev.filter((msg) => msg.sender !== "typing"));

      // Add the AI's response
      setMessages((prev) => [...prev, { text: aiResponse, sender: "bot" }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => {
        const newMessages = prev.filter((msg) => msg.sender !== "typing");
        return [
          ...newMessages,
          {
            text: `I'm sorry, I encountered an error: ${error.message}`,
            sender: "bot",
          },
        ];
      });
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isOpen ? "w-96 h-[500px]" : "w-16 h-16"
      }`}
    >
      {isOpen ? (
        <div className="w-full h-full bg-white dark:bg-dark-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-dark-700 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-700 bg-primary-600 text-white rounded-t-2xl">
            <h3 className="font-semibold text-lg">AI Assistant</h3>
            <button
              onClick={toggleChat}
              className="p-2 hover:bg-primary-700 rounded-lg transition-colors duration-200"
            >
              <IoMdClose size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => {
              const messageKey = `msg-${index}-${message.text
                .substring(0, 10)
                .replace(/\s+/g, "-")}`;

              return (
                <React.Fragment key={messageKey}>
                  {message.sender === "typing" ? (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 dark:bg-dark-700 rounded-2xl px-4 py-3 max-w-xs">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`rounded-2xl px-4 py-3 max-w-xs ${
                          message.sender === "user"
                            ? "bg-primary-600 text-white"
                            : "bg-gray-100 dark:bg-dark-700 text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        <div className="text-sm">{message.text}</div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Form */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-gray-200 dark:border-dark-700"
          >
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <IoSend size={18} />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="w-16 h-16 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        >
          <FaRobot size={24} />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
