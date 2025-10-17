import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-cyan-800/50 no-print">
      <div className="container mx-auto px-4 py-6 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} DevCaliber. All rights reserved.</p>
        <p className="text-sm mt-1">AI-Powered Skill Verification Platform</p>
      </div>
    </footer>
  );
};

export default Footer;
