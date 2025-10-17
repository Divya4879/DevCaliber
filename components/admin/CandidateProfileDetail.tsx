import React from 'react';
import { CandidateProfile } from '../../types';
import AnalysisDisplay from '../common/AnalysisDisplay';

interface CandidateProfileDetailProps {
  candidate: CandidateProfile;
  onBack: () => void;
}

const CandidateProfileDetail: React.FC<CandidateProfileDetailProps> = ({ candidate, onBack }) => {
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <button onClick={onBack} className="mb-6 px-4 py-2 text-sm font-medium text-white bg-slate-700 rounded-md hover:bg-slate-800 transition-colors no-print">
        &larr; Back to Dashboard
      </button>

      <div className="bg-slate-800/30 p-8 rounded-lg border border-cyan-800/50">
        <div className="flex items-center mb-8 flex-wrap">
          <img src={candidate.profilePicture || `https://i.pravatar.cc/150?u=${candidate.id}`} alt={candidate.name} className="w-24 h-24 rounded-full mr-6 border-4 border-cyan-400" />
          <div>
            <h2 className="text-4xl font-bold text-white">{candidate.name}</h2>
            <p className="text-lg text-gray-400">{candidate.email}</p>
            <a 
              href={`https://github.com/${candidate.githubUsername}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg text-cyan-400 hover:underline"
            >
              github.com/{candidate.githubUsername}
            </a>
          </div>
        </div>
        
        {candidate.githubAnalysis && (
          <div className="mb-8">
            <AnalysisDisplay analysis={candidate.githubAnalysis} />
          </div>
        )}

        {candidate.badges && candidate.badges.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-400 mb-4">Verified Badges</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {candidate.badges.map((badge, index) => (
                  <div key={index} className="text-center bg-slate-700/30 p-4 rounded-lg border border-cyan-800/30">
                    <img 
                      src={`/skill-badges/${badge.skill === 'JavaScript' ? 'JS' : 
                                          badge.skill === 'TypeScript' ? 'Typescript' :
                                          badge.skill === 'Node.js' ? 'NodeJs' :
                                          badge.skill === 'Full Stack' ? 'FullStack' :
                                          badge.skill === 'UI/UX' ? 'UI UX' :
                                          badge.skill}-${(badge.level || 'intermediate').toLowerCase()}.png`}
                      alt={`${badge.skill} ${badge.level} Badge`}
                      className="w-32 h-32 mx-auto mb-3 rounded-full object-cover"
                    />
                    <div className="text-sm text-gray-300">
                      <p className="font-semibold text-white">{candidate.name}</p>
                      <div className="text-cyan-400 font-medium">
                        <span className="font-bold text-cyan-300">{badge.skill}</span>
                        <br />
                        <span className="font-bold text-cyan-300">{badge.level}</span>
                      </div>
                      <br />
                      <p className="text-gray-400">
                        <span className="font-bold">Verified:</span> {badge.dateIssued}
                      </p>
                      <br />
                      <p className="text-xs text-teal-300 mt-1 font-bold">DevCaliber Certified</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default CandidateProfileDetail;
