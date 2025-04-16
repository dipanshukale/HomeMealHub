import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';

const CustomMealChatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', message: "Hi! 👋 I'm here to help you customize your meal. Tell me what you'd like!" }
  ]);
  const [isVisible, setIsVisible] = useState(true);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSendMessage = (message) => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    const newUserMessage = { type: 'user', message: trimmedMessage };
    const botResponse = { type: 'bot', message: generateBotResponse(trimmedMessage) };

    setChatHistory(prev => [...prev, newUserMessage, botResponse]);
    setUserMessage('');
  };

  const generateBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('base')) {
      return "What base would you like for your meal? (e.g., Rice, Noodles)";
    } else if (lowerMessage.includes('topping') || lowerMessage.includes('top')) {
      return "What toppings would you like? (e.g., Chicken, Tofu, Vegetables)";
    } else if (lowerMessage.includes('spice') || lowerMessage.includes('spicy')) {
      return "How spicy would you like your meal? (Mild, Medium, Spicy)";
    } else if (lowerMessage.includes('done') || lowerMessage.includes('thank')) {
      return "You're all set! Let me know if you'd like to make more changes.";
    } else {
      return "Can I help you customize your meal? Please tell me your preferences!";
    }
  };

  if (!isVisible) return null;

  return (
    <div className="w-96 h-[500px] bg-gray-100 rounded-lg shadow-lg flex flex-col relative">
      <div className="bg-orange-600 text-white p-4 flex items-center justify-between rounded-t-lg">
        <div className="flex items-center gap-2">
          <AiOutlineUser className="text-2xl" />
          <h2 className="text-lg font-semibold">Meal Customization Chatbot</h2>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white hover:text-gray-200 text-2xl"
        >
          <IoClose />
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`${
              chat.type === 'user' ? 'text-right' : 'text-left'
            } p-2 mb-2`}
          >
            <div
              className={`inline-block p-3 rounded-lg max-w-[80%] ${
                chat.type === 'user' ? 'bg-yellow-300' : 'bg-white text-gray-800 border'
              }`}
            >
              {chat.message}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 bg-white flex gap-2">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your preference..."
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(userMessage)}
        />
        <button
          onClick={() => handleSendMessage(userMessage)}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CustomMealChatbot;
