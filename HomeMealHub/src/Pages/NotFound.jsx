import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF1D5] to-[#FFE4B5] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-2xl w-full"
      >
        {/* Illustration Section */}
        <div className="bg-[#F17228] p-8 text-center">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 2 
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-32 w-32 mx-auto text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#F17228] mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/"
              className="px-8 py-3 bg-[#F17228] text-white rounded-lg font-medium hover:bg-[#e16523] transition-colors shadow-md hover:shadow-lg"
            >
              Return Home
            </Link>
            <Link
              to="/"
              className="px-8 py-3 border-2 border-[#F17228] text-[#F17228] rounded-lg font-medium hover:bg-[#FFF1D5] transition-colors"
            >
              Explore Menu
            </Link>
          </div>

          {/* Fun food animation */}
          <div className="mt-12 flex justify-center space-x-4">
            {['🍔', '🍕', '🥗', '🍣'].map((emoji, index) => (
              <motion.span
                key={index}
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2 + index,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-3xl"
              >
                {emoji}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;