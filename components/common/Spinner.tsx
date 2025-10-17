import React from 'react';

interface SpinnerProps {
    text?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 my-8">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
      {text && <p className="text-lg text-gray-300 animate-pulse">{text}</p>}
    </div>
  );
};

export default Spinner;
