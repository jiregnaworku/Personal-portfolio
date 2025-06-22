import React, { useState, useRef, useEffect } from 'react';
import { IoSend } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { FaRobot } from 'react-icons/fa';
import { getCurrentPageKnowledge } from '../../utils/websiteKnowledge';
import '../../Styles/Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "Hi there! I'm your AI assistant. You can ask me anything about Jiregna's portfolio, skills, or experience. How can I help you today?", 
      sender: 'bot' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    
    // Add a typing indicator
    const typingIndicator = { text: 'typing', sender: 'typing' };
    setMessages(prev => [...prev, typingIndicator]);
    
    setInput('');

    try {
      // Get page context
      console.log('Getting page knowledge...');
      const pageKnowledge = await getCurrentPageKnowledge();
      const context = pageKnowledge.join('\n').substring(0, 1000);
      console.log('Page context length:', context.length);
      
      // Get OpenRouter API key
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
      
      if (!apiKey) {
        throw new Error('OpenRouter API key not found. Please set VITE_OPENROUTER_API_KEY in your .env file');
      }

      // Get structured content for the system prompt
      const structuredContent = await getCurrentPageKnowledge();
      const pageTitle = document.title.replace(/- Personal Portfolio$/, '').trim();
      
      console.log('Sending request to OpenRouter...');
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.href,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct',
          messages: [
            {
              role: 'system',
              content: `You are an AI assistant for ${pageTitle || 'a portfolio website'}. \
You should answer questions based on the following information about the portfolio owner. \
Be concise and helpful. If you don't know the answer, say so.\n\n` +
              `PORTFOLIO CONTEXT:\n${structuredContent.join('\n')}\n\n` +
              `GUIDELINES:\n` +
              `- Only answer questions about the portfolio owner, their skills, projects, and experience\n` +
              `- Be professional but friendly in your responses\n` +
              `- If asked about skills or projects, list the most relevant ones from the context\n` +
              `- For contact information, only provide what's explicitly mentioned in the context`
            },
            {
              role: 'user',
              content: input
            }
          ],
          max_tokens: 300,
          temperature: 0.7,
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('OpenRouter API Error:', errorData);
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response from OpenRouter:', data);
      
      if (!data.choices?.[0]?.message?.content) {
        throw new Error('Unexpected response format from OpenRouter');
      }

      // Extract and clean the AI's response
      const aiResponse = data.choices[0].message.content.trim();
      console.log('AI Response:', aiResponse);

      // Remove the typing indicator
      setMessages(prev => prev.filter(msg => msg.sender !== 'typing'));
      
      // Add the AI's response
      setMessages(prev => [...prev, { text: aiResponse, sender: 'bot' }]);

    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => {
        const newMessages = prev.filter(msg => msg.sender !== 'typing');
        return [...newMessages, { 
          text: `I'm sorry, I encountered an error: ${error.message}`,
          sender: 'bot' 
        }];
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
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      {isOpen ? (
        <div className="chat-window">
          <div className="chat-header">
            <h3>AI Assistant</h3>
            <button className="close-btn" onClick={toggleChat}>
              <IoMdClose />
            </button>
          </div>
          <div className="messages">
            {messages.map((message, index) => {
              // Create a unique key using index and first few chars of message
              const messageKey = `msg-${index}-${message.text.substring(0, 10).replace(/\s+/g, '-')}`;
              
              return (
                <React.Fragment key={messageKey}>
                  {message.sender === 'typing' ? (
                    <div className="message bot">
                      <div className="typing-indicator">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                    </div>
                  ) : (
                    <div className={`message ${message.sender}`}>
                      <div className="message-content">
                        {message.text}
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="message-form">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              required
            />
            <button type="submit" className="send-btn">
              <IoSend />
            </button>
          </form>
        </div>
      ) : (
        <button className="chat-toggle" onClick={toggleChat}>
          <FaRobot className="chat-icon" />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
