import { useState, useRef, useEffect } from 'react';
import { FiSend, FiMessageSquare } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { nutritionData } from "../Data/NutritionData";

const NutritionChatbot = () => {
  const [messages, setMessages] = useState([
    { 
      text: "Hi there! I'm NutriBot, your nutrition assistant. Ask me about meal plans, vitamins, or healthy recipes!", 
      sender: 'bot' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);


  const quickQuestions = [
    "What are high-protein vegetarian foods?",
    "Best foods for vitamin D?",
    "Suggest a balanced breakfast",
    "Foods to boost immunity",
    "Healthy snacks for weight loss"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;


    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setMessages(prev => [...prev, { text: "Thinking...", sender: 'bot' }]);

    const lowerInput = input.toLowerCase();
    let botResponse = nutritionData[lowerInput] || 
      "I'm still learning about nutrition! For now, I can tell you about: protein foods, vitamin C, iron rich foods, healthy breakfast, weight loss, and vegan protein.";

    setTimeout(() => {
      setMessages(prev => [...prev.slice(0, -1), { text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="w-80 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200"
        >
          <div className="bg-[#F17228] text-white p-3 flex justify-between items-center">
            <h3 className="font-bold">NutriGuide</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-[#FFBE98] cursor-pointer"
            >
              ×
            </button>
          </div>

          <div className="h-64 overflow-y-auto p-3 bg-gray-50">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs p-3 rounded-lg ${msg.sender === 'user' 
                      ? 'bg-[#F17228] text-white' 
                      : 'bg-white border border-gray-200'}`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 bg-gray-100 border-t">
            <div className="flex flex-wrap gap-2 mb-2">
              {quickQuestions.map((q, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setInput(q);
                    setTimeout(handleSend, 100);
                  }}
                  className="text-xs bg-white hover:bg-[#FFF1D5] text-[#F17228] px-2 py-1 rounded border border-[#FFBE98]"
                >
                  {q}
                </motion.button>
              ))}
            </div>

            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about nutrition..."
                className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-1 focus:ring-[#F17228]"
              />
              <button
                onClick={handleSend}
                className="bg-[#F17228] text-white p-2 rounded-r hover:bg-[#e16523]"
              >
                <FiSend />
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="bg-[#F17228] text-white p-4 rounded-full cursor-pointer shadow-lg hover:bg-[#e16523] transition-all"
          >
            <span className='flex items-center justify-center'><img className='w-8 h-8 object-contain' src='./chat.png'/></span>
        </motion.button>
      )}
    </div>
  );
};

export default NutritionChatbot;