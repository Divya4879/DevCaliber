import React, { useState, useEffect } from 'react';
import { mockCandidates, mockRecruiters } from '../../data/mockData';
import { CandidateProfile } from '../../types';
import CandidateProfileDetail from './CandidateProfileDetail';
import RecruiterRequestsTable from './RecruiterRequestsTable';
import ChatBubble from '../chat/ChatBubble';
import { MessagingService } from '../../services/messagingService';
import { RecruiterRequestService } from '../../services/recruiterRequestService';
import { useAuth } from '../../hooks/useAuth';

type Tab = 'candidates' | 'recruiters' | 'recruiter-requests';

interface AdminDashboardProps {
  onNavigateToChat?: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateToChat }) => {
  const { user } = useAuth();
  const [candidates] = useState<CandidateProfile[]>(mockCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateProfile | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('candidates');
  const [unreadCount, setUnreadCount] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);

  useEffect(() => {
    if (user?.email) {
      const count = MessagingService.getUnreadCount(user.email);
      setUnreadCount(count);
      
      const requests = RecruiterRequestService.getPendingRequests();
      setPendingRequests(requests.length);
    }
  }, [user?.email, activeTab]);

  if (selectedCandidate) {
    return <CandidateProfileDetail candidate={selectedCandidate} onBack={() => setSelectedCandidate(null)} />;
  }

  const tabClasses = (tabName: Tab) => 
    `px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        activeTab === tabName 
        ? 'bg-cyan-600 text-white' 
        : 'text-gray-300 hover:bg-slate-700'
    }`;


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white font-poppins">Welcome Admin 🫡</h1>
        <p className="text-lg text-gray-400 mt-2 font-inter">You can check out the verified recruiters and candidates here.</p>
      </div>

      <div className="flex justify-center mb-6 border-b border-slate-700">
        <div className="flex space-x-4">
            <button onClick={() => setActiveTab('candidates')} className={tabClasses('candidates')}>
                Candidates ({mockCandidates.length})
            </button>
            <button onClick={() => setActiveTab('recruiters')} className={tabClasses('recruiters')}>
                Recruiters ({mockRecruiters.length})
            </button>
            <button onClick={() => setActiveTab('recruiter-requests')} className={tabClasses('recruiter-requests')}>
              Recruiter Requests {pendingRequests > 0 && (
                <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs ml-2">
                  {pendingRequests}
                </span>
              )}
            </button>
            
        </div>
      </div>
      
      <div className="bg-slate-800/30 p-6 rounded-lg border border-cyan-800/50">
        {activeTab === 'candidates' && (
             <div>
                <h2 className="text-2xl font-bold text-white mb-4">All Candidates</h2>
                <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-700">
                    <thead className="bg-slate-800">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">GitHub</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Verified Badges</th>
                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">View</span></th>
                    </tr>
                    </thead>
                    <tbody className="bg-slate-900/50 divide-y divide-slate-800">
                    {candidates.map((candidate) => (
                        <tr key={candidate.id} className="hover:bg-slate-800/70">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{candidate.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{candidate.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            <a 
                                href={`https://github.com/${candidate.githubUsername}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-400 hover:text-cyan-300 underline"
                            >
                                {candidate.githubUsername}
                            </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-semibold text-center">{candidate.badges.length}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                            onClick={() => setSelectedCandidate(candidate)}
                            className="text-cyan-400 hover:text-cyan-300"
                            >
                            View Profile
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
        )}
        {activeTab === 'recruiters' && (
            <div>
                <h2 className="text-2xl font-bold text-white mb-4">Verified Recruiters</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockRecruiters.map((recruiter) => (
                        <div key={recruiter.id} className="bg-slate-800/50 rounded-lg p-6 border border-slate-600/50 hover:border-cyan-500/50 transition-all">
                            <div className="flex items-center space-x-4 mb-4">
                                <img 
                                    src={recruiter.profilePicture || `https://i.pravatar.cc/150?u=${recruiter.id}`} 
                                    alt={recruiter.name}
                                    className="w-16 h-16 rounded-full border-2 border-cyan-400"
                                />
                                <div>
                                    <h3 className="text-white font-semibold text-lg">{recruiter.name}</h3>
                                    <p className="text-cyan-400 text-sm">{recruiter.title}</p>
                                    <p className="text-gray-300 text-sm font-bold">{recruiter.company}</p>
                                </div>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                                <p className="text-gray-300">
                                    <span className="font-semibold">Location:</span> {recruiter.location}
                                </p>
                                <p className="text-gray-300">
                                    <span className="font-semibold">Experience:</span> {recruiter.experience}
                                </p>
                                <p className="text-gray-300">
                                    <span className="font-semibold">Specialization:</span> {recruiter.specialization}
                                </p>
                                <p className="text-green-400">
                                    <span className="font-semibold">Hired:</span> {recruiter.hiredCount}+ engineers
                                </p>
                                <p className="text-gray-400 text-xs mt-2">{recruiter.description}</p>
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-slate-600/50">
                                <p className="text-gray-400 text-sm">
                                    <span className="font-semibold">Email:</span> {recruiter.email}
                                </p>
                                <p className="text-gray-500 text-xs mt-1">
                                    Last activity: {recruiter.viewedAt}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
        {activeTab === 'recruiter-requests' && (
            <div>
                <h2 className="text-2xl font-bold text-white mb-4">Recruiter Verification Requests</h2>
                <RecruiterRequestsTable />
            </div>
        )}
        {activeTab === 'messages' && (
            <MessagesPage />
        )}
      </div>
      
      {/* Chat Bubble */}
      {onNavigateToChat && <ChatBubble onClick={onNavigateToChat} />}
    </div>
  );
};

export default AdminDashboard;
