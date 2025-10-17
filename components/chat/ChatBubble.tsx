import React, { useState } from 'react';

interface ChatBubbleProps {
  onClick: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          w-16 h-16 bg-gradient-to-r from-cyan-600 to-blue-600 
          rounded-full shadow-lg hover:shadow-xl
          flex items-center justify-center text-white text-2xl
          transition-all duration-300 transform
          ${isHovered ? 'scale-110 shadow-cyan-500/50' : 'scale-100'}
          hover:from-cyan-700 hover:to-blue-700
          border-2 border-cyan-400/30
        `}
      >
        <span className={`transition-transform duration-300 ${isHovered ? 'animate-bounce' : ''}`}>
          💬
        </span>
      </button>
      
      {isHovered && (
        <div className="absolute bottom-20 right-0 bg-slate-800/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap border border-cyan-500/30">
          Ask Agent
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800/90"></div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
