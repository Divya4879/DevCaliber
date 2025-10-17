import React, { useState, useEffect } from 'react';
import { mockCandidates } from '../../data/mockData';
import { CandidateProfile } from '../../types';
import CandidateProfileDetail from '../admin/CandidateProfileDetail'; // Reusing this component
import MessagesPage from '../messages/MessagesPage';
import ChatBubble from '../chat/ChatBubble';
import { MessagingService } from '../../services/messagingService';
import { useAuth } from '../../hooks/useAuth';

interface RecruiterDashboardProps {
  onNavigateToChat?: () => void;
}

const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({ onNavigateToChat }) => {
  const { user } = useAuth();
  const [candidates] = useState<CandidateProfile[]>(mockCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateProfile | null>(null);
  const [showMessages, setShowMessages] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user?.email) {
      const count = MessagingService.getUnreadCount(user.email);
      setUnreadCount(count);
    }
  }, [user?.email, showMessages]);

  if (selectedCandidate) {
    return <CandidateProfileDetail candidate={selectedCandidate} onBack={() => setSelectedCandidate(null)} />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <div className="flex justify-between items-center mb-4">
          <div></div>
          <h1 className="text-4xl font-bold text-white font-poppins">Recruiter Dashboard</h1>
          <button
            onClick={() => setShowMessages(!showMessages)}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            <span>Messages</span>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
        <p className="text-lg text-gray-400 font-inter">Discover AI-vetted candidates from our exclusive talent pool</p>
      </div>

      {showMessages ? (
        <MessagesPage onBack={() => setShowMessages(false)} />
      ) : (
        <div className="bg-slate-800/30 p-6 rounded-lg border border-cyan-800/50">
        <h2 className="text-2xl font-bold text-white mb-4">Talent Pool</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map(candidate => (
                <div 
                    key={candidate.id}
                    onClick={() => setSelectedCandidate(candidate)}
                    className="bg-slate-800/50 p-6 rounded-lg border border-cyan-800/50 cursor-pointer hover:border-cyan-500 transition-colors transform hover:-translate-y-1 flex flex-col justify-between"
                >
                    <div>
                        <div className="flex items-center mb-4">
                            <img 
                                src={candidate.profilePicture || `https://randomuser.me/api/portraits/${candidate.id === 'demo-candidate' ? 'women' : Math.random() > 0.5 ? 'men' : 'women'}/${Math.abs(candidate.id.hashCode ? candidate.id.hashCode() : parseInt(candidate.id) || 1) % 100}.jpg`} 
                                alt={candidate.name} 
                                className="w-16 h-16 rounded-full mr-4 border-2 border-cyan-400 object-cover" 
                            />
                            <div>
                                <h3 className="text-xl font-bold text-white">{candidate.name}</h3>
                                <p className="text-gray-400 text-sm">{candidate.location}</p>
                                <p className="text-cyan-400 text-sm">{candidate.experience} experience</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-300 mb-4 italic">"{candidate.githubAnalysis?.summary?.substring(0, 120) || 'Experienced developer with strong technical skills'}..."</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {candidate.skills.slice(0, 4).map((skill, index) => (
                                <span key={skill} className={`text-xs font-medium px-2 py-1 rounded-full ${
                                    candidate.proficiency[index] === 'Expert' ? 'bg-green-600 text-white' :
                                    candidate.proficiency[index] === 'Advanced' ? 'bg-blue-600 text-white' :
                                    candidate.proficiency[index] === 'Intermediate' ? 'bg-yellow-600 text-white' :
                                    'bg-slate-600 text-gray-300'
                                }`}>
                                    {skill} ({candidate.proficiency[index]})
                                </span>
                            ))}
                        </div>
                    </div>

                    {candidate.badges && candidate.badges.length > 0 && (
                         <div className="mt-auto">
                            <h4 className="text-xs font-semibold text-gray-400 mb-2">Verified Badges</h4>
                            <div className="flex flex-wrap gap-1">
                                {candidate.badges.map((badge, index) => (
                                    <div key={index} className={`text-xs px-2 py-1 rounded-full border ${
                                        badge.level === 'Expert' ? 'bg-green-600/20 border-green-500 text-green-300' :
                                        badge.level === 'Advanced' ? 'bg-blue-600/20 border-blue-500 text-blue-300' :
                                        badge.level === 'Intermediate' ? 'bg-yellow-600/20 border-yellow-500 text-yellow-300' :
                                        'bg-slate-600/20 border-slate-500 text-slate-300'
                                    }`}>
                                        ✓ {badge.skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>
      )}
      
      {/* Chat Bubble */}
      {onNavigateToChat && <ChatBubble onClick={onNavigateToChat} />}
    </div>
  );
};

export default RecruiterDashboard;
