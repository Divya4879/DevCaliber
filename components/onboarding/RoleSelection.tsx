import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types';
import RecruiterVerification from './RecruiterVerification';

const RoleCard: React.FC<{ title: string; description: string; onSelect: () => void; icon: string }> = ({ title, description, onSelect, icon }) => (
    <div
      onClick={onSelect}
      className="bg-slate-800/30 border-2 border-cyan-800/50 rounded-lg p-8 text-center cursor-pointer hover:border-cyan-500 hover:bg-slate-700/30 transition-all transform hover:-translate-y-1"
    >
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );


const RoleSelection: React.FC = () => {
  const { setRole, user } = useAuth();
  const [showRecruiterVerification, setShowRecruiterVerification] = useState(false);

  // Safeguard for special demo accounts
  if (user && (user.email === 'admin@testcredential.com' || user.email?.startsWith('recruiter@') || user.email === 'candidate@testcredential.com' )) {
    return (
        <div className="container mx-auto px-4 py-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Account Role Pre-assigned</h2>
            <p className="text-xl text-gray-300">
                This special demo account has a pre-assigned role. You should be redirected automatically.
            </p>
        </div>
    );
  }

  if (showRecruiterVerification) {
    return <RecruiterVerification />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-white mb-4">Welcome, {user?.name || user?.email}!</h2>
        <p className="text-xl text-gray-300 mb-12">To get started, please tell us who you are.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RoleCard 
              title="I'm a Candidate" 
              description="Get your skills verified by AI and showcase your credentials to top recruiters." 
              onSelect={() => setRole(UserRole.CANDIDATE)}
              icon="💻"
          />
          <RoleCard 
              title="I'm a Recruiter" 
              description="Discover top-tier, AI-vetted talent with verified skills and profiles." 
              onSelect={() => setShowRecruiterVerification(true)}
              icon="🤝"
          />
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
