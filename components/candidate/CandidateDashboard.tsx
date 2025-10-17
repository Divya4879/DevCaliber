import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useAuth0 } from '@auth0/auth0-react';
import { GithubRepo, GithubAnalysis } from '../../types';
import { analyzeGithubProfile, generateSkillBadge } from '../../services/geminiService';
import Spinner from '../common/Spinner';
import AnalysisDisplay from '../common/AnalysisDisplay';
import { mockAnalysis, mockRecruiters } from '../../data/mockData';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import MessagesPage from '../messages/MessagesPage';
import { MessagingService } from '../../services/messagingService';
import { GitHubAuthService } from '../../services/githubAuthService';
import { ProfileStorageService } from '../../services/profileStorageService';

type CandidateSection = 'profile' | 'recruiters' | 'messages';

const CandidateDashboard: React.FC = () => {
  const { user } = useAuth();
  const { loginWithRedirect } = useAuth0();
  const isDemoCandidate = user?.email === 'candidate@testcredential.com';

  const [activeSection, setActiveSection] = useState<CandidateSection>('profile');
  const [githubUsername, setGithubUsername] = useState(user?.githubUsername || '');
  const [unreadCount, setUnreadCount] = useState(0);
  const [connectedGithubUsername, setConnectedGithubUsername] = useState<string | null>(null);

  useEffect(() => {
    if (user?.email) {
      const count = MessagingService.getUnreadCount(user.email);
      setUnreadCount(count);
      
      // Load saved profile analysis if exists
      const savedProfile = ProfileStorageService.getSavedProfile(user.email);
      if (savedProfile && !analysis) {
        setAnalysis(savedProfile.analysis);
        setBadges(savedProfile.badges);
        setGithubUsername(savedProfile.githubUsername);
        setConnectedGithubUsername(savedProfile.githubUsername);
      }
    }
    
    // Check for connected GitHub username
    const storedUsername = localStorage.getItem('github_username');
    if (storedUsername && !connectedGithubUsername) {
      setConnectedGithubUsername(storedUsername);
      setGithubUsername(storedUsername);
    }
  }, [user?.email, activeSection]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysis, setAnalysis] = useState<GithubAnalysis | null>(null);
  const [badges, setBadges] = useState<any[]>([]);
  const [generatingBadges, setGeneratingBadges] = useState(false);
  const [showDemoContent, setShowDemoContent] = useState(isDemoCandidate);

  // Demo badges for demo candidate
  const demoBadges = [
    {
      imagePath: '/skill-badges/Frontend-expert.png',
      skill: 'Frontend Development',
      proficiency: 'Expert',
      username: 'Mr/Miss Demo Candidate',
      dateIssued: '10/16/2025'
    },
    {
      imagePath: '/skill-badges/Backend-advanced.png',
      skill: 'Backend API Design', 
      proficiency: 'Advanced',
      username: 'Mr/Miss Demo Candidate',
      dateIssued: '10/16/2025'
    },
    {
      imagePath: '/skill-badges/Typescript-expert.png',
      skill: 'TypeScript',
      proficiency: 'Expert',
      username: 'Mr/Miss Demo Candidate',
      dateIssued: '10/16/2025'
    }
  ];

  useEffect(() => {
    if (isDemoCandidate) {
      setAnalysis(mockAnalysis);
      // Set demo badges for demo candidate
      const demoBadges = [
        {
          imagePath: '/skill-badges/Frontend-expert.png',
          skill: 'Frontend Development',
          proficiency: 'Expert',
          username: 'Mr/Miss Demo Candidate',
          dateIssued: '10/16/2025'
        },
        {
          imagePath: '/skill-badges/Backend-advanced.png',
          skill: 'Backend API Design', 
          proficiency: 'Advanced',
          username: 'Mr/Miss Demo Candidate',
          dateIssued: '10/16/2025'
        },
        {
          imagePath: '/skill-badges/Typescript-expert.png',
          skill: 'TypeScript',
          proficiency: 'Expert',
          username: 'Mr/Miss Demo Candidate',
          dateIssued: '10/16/2025'
        }
      ];
      setBadges(demoBadges);
    } else if (user?.githubUsername && !analysis) {
      // Check for saved analysis first
      const savedAnalysis = localStorage.getItem(`analysis_${user.githubUsername}`);
      if (savedAnalysis) {
        setAnalysis(JSON.parse(savedAnalysis));
      } else {
        handleAutoAnalyze();
      }
    }
  }, [isDemoCandidate, user?.githubUsername]);

  const handleAutoAnalyze = async () => {
    if (!user?.githubUsername) return;
    
    setLoading(true);
    setError('');
    setAnalysis(null);
    setBadges([]);

    try {
      const result = await analyzeGithubProfile(user.githubUsername);
      if (result) {
        setAnalysis(result);
        // Save analysis to localStorage
        localStorage.setItem(`analysis_${user.githubUsername}`, JSON.stringify(result));
      } else {
        setError('Failed to analyze the profile. Please try again.');
      }
    } catch (err: any) {
      if (err.message?.includes('404')) {
        setError('GitHub user not found. Please check your GitHub profile.');
      } else {
        setError('An error occurred while analyzing the profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!githubUsername) {
      setError('Please enter a GitHub username.');
      return;
    }
    setLoading(true);
    setError('');
    setAnalysis(null);
    setBadges([]);
    setShowDemoContent(false);

    try {
      // Use mock data for demo candidate, real API for others
      if (isDemoCandidate && githubUsername === 'democandidate') {
        // Keep existing mock behavior for demo
        const mockRepos: GithubRepo[] = [
          { name: 'personal-website', description: 'My portfolio website built with React and Next.js', language: 'TypeScript', stargazers_count: 15, forks_count: 3 },
          { name: 'task-manager-api', description: 'A RESTful API for a task management app using Node.js, Express, and MongoDB.', language: 'JavaScript', stargazers_count: 25, forks_count: 8 },
          { name: 'data-viz-project', description: 'Visualizing climate data with D3.js and Python.', language: 'Python', stargazers_count: 10, forks_count: 1 },
        ];
        const result = await analyzeGithubProfile(githubUsername, mockRepos);
        if (result) {
          setAnalysis(result);
          // Save analysis to localStorage
          localStorage.setItem(`analysis_${githubUsername}`, JSON.stringify(result));
        } else {
          setError('Failed to analyze the profile. The AI service may be unavailable.');
        }
      } else {
        // Real GitHub API for actual users
        const result = await analyzeGithubProfile(githubUsername);
        if (result) {
          setAnalysis(result);
          // Save analysis to localStorage
          localStorage.setItem(`analysis_${githubUsername}`, JSON.stringify(result));
        } else {
          setError('Failed to analyze the profile. Please check the username and try again.');
        }
      }
    } catch (err: any) {
      if (err.message?.includes('404')) {
        setError('GitHub user not found. Please check the username.');
      } else {
        setError('An error occurred while analyzing the profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubConnect = async () => {
    try {
      if (!GitHubAuthService.isConfigured()) {
        setError('GitHub authentication is not configured. Please contact support.');
        return;
      }
      
      setLoading(true);
      GitHubAuthService.initiateGitHubAuth();
    } catch (error) {
      console.error('GitHub auth initiation failed:', error);
      setError('Failed to initiate GitHub authentication. Please try again.');
      setLoading(false);
    }
  };

  const handleAnalyzeWithUsername = async (username: string) => {
    setLoading(true);
    setError('');
    setAnalysis(null);
    setBadges([]);

    try {
      const result = await analyzeGithubProfile(username);
      if (result) {
        setAnalysis(result);
        // Save analysis to localStorage
        localStorage.setItem(`analysis_${username}`, JSON.stringify(result));
      } else {
        setError('Failed to analyze the profile. Please check the username and try again.');
      }
    } catch (err: any) {
      if (err.message?.includes('404')) {
        setError('GitHub user not found. Please check the username.');
      } else {
        setError('An error occurred while analyzing the profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = () => {
    if (!analysis || !user?.email) return;
    
    ProfileStorageService.saveProfile(
      user.email,
      githubUsername || connectedGithubUsername || 'unknown',
      analysis,
      badges
    );
    
    alert('Profile analysis saved successfully!');
  };

  const handleNewAnalysis = () => {
    setAnalysis(null);
    setBadges([]);
    setError('');
    setGithubUsername('');
    // Clear saved analysis
    if (user?.githubUsername) {
      localStorage.removeItem(`analysis_${user.githubUsername}`);
    }
  };

  const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0);

  const handleGenerateBadges = async () => {
    if (!analysis) return;
    setGeneratingBadges(true);
    
    const skillsArray = analysis.skills || analysis.keySkills || [];
    const newBadges = [];
    
    for (const skill of skillsArray) {
      const badgePath = await generateSkillBadge(skill.skill || skill, skill.proficiency || 'intermediate');
      if (badgePath) {
        newBadges.push({
          imagePath: badgePath,
          skill: skill.skill || skill,
          proficiency: skill.proficiency || 'intermediate',
          username: githubUsername || user?.name || 'User',
          dateIssued: new Date().toLocaleDateString()
        });
      }
    }
    
    setBadges(newBadges);
    setGeneratingBadges(false);
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 rounded-lg p-6 border border-cyan-800/30">
        <h2 className="text-2xl font-bold text-white mb-4">GitHub Profile Analysis</h2>
        
        {isDemoCandidate ? (
          // Demo candidate - show manual input and analyze button
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <input
                type="text"
                placeholder="Enter GitHub username"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                className="flex-1 px-4 py-2 bg-slate-900 border border-slate-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-md hover:from-cyan-700 hover:to-blue-700 disabled:opacity-50 transition-all duration-200"
              >
                {loading ? 'Analyzing...' : 'Analyze Profile'}
              </button>
            </div>
          </div>
        ) : (
          // Real candidates - show GitHub connection status
          <div className="text-center py-8">
            {connectedGithubUsername ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-green-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Connected to GitHub: <strong>{connectedGithubUsername}</strong></span>
                </div>
                <button
                  onClick={() => handleAnalyzeWithUsername(connectedGithubUsername)}
                  disabled={loading}
                  className="px-6 py-3 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 disabled:opacity-50 transition-all duration-200"
                >
                  {loading ? 'Analyzing...' : 'Analyze My Profile'}
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem('github_username');
                    localStorage.removeItem('github_email');
                    setConnectedGithubUsername(null);
                  }}
                  className="block mx-auto text-sm text-gray-400 hover:text-white mt-2"
                >
                  Disconnect GitHub
                </button>
              </div>
            ) : (
              <div>
                <p className="text-gray-400 mb-6">Connect your GitHub account to analyze your profile</p>
                <button
                  onClick={handleGitHubConnect}
                  disabled={loading}
                  className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 transition-all duration-200 flex items-center gap-2 mx-auto"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                  Connect GitHub Account
                </button>
              </div>
            )}
          </div>
        )}
        
        {error && <div className="text-red-400 text-sm mb-4">{error}</div>}
      </div>

      {loading && (
        <div className="flex justify-center">
          <Spinner text="Analyzing your GitHub profile..." />
        </div>
      )}

      {(analysis || showDemoContent) && (
        <div id="profile-content" className="space-y-6">
          <AnalysisDisplay analysis={analysis || mockAnalysis} />
          
          {analysis && (
            <div className="bg-slate-800/50 rounded-lg p-6 border border-cyan-800/30">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">Skill Verification Badges</h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleGenerateBadges}
                    disabled={generatingBadges}
                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-md hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 transition-all duration-200"
                  >
                    {generatingBadges ? 'Generating All Badges...' : 'Generate All Badges'}
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-md hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                  >
                    Save Profile
                  </button>
                  <button
                    onClick={handleNewAnalysis}
                    className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-md hover:from-orange-700 hover:to-red-700 transition-all duration-200"
                  >
                    New Analysis
                  </button>
                </div>
              </div>
              {badges.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {badges.map((badge, index) => (
                    <div key={index} className="text-center bg-slate-700/30 p-4 rounded-lg border border-cyan-800/30">
                      <img 
                        src={badge.imagePath} 
                        alt={`${badge.skill} ${badge.proficiency} Badge`}
                        className="w-32 h-32 mx-auto mb-3 rounded-full object-cover"
                      />
                      <div className="text-sm text-gray-300">
                        <p className="font-semibold text-white">{badge.username}</p>
                        <div className="text-cyan-400 font-medium">
                          <span className="font-bold text-cyan-300">
                            {badge.skill === 'JS' ? 'JavaScript' : 
                             badge.skill === 'Typescript' ? 'TypeScript' :
                             badge.skill === 'NodeJs' ? 'Node.js' : 
                             badge.skill === 'FullStack' ? 'Full Stack' : 
                             badge.skill === 'Frontend' ? 'Frontend Development' :
                             badge.skill === 'Backend' ? 'Backend Development' :
                             badge.skill === 'UI UX' ? 'UI/UX Design' : 
                             badge.skill === 'WebAccessibility' ? 'Web Accessibility' : 
                             badge.skill}
                          </span>
                          <br />
                          <span className="font-bold text-cyan-300">{badge.proficiency}</span>
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
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderRecruitersSection = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 rounded-lg p-6 border border-cyan-800/30">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Interested Recruiters</h2>
            <p className="text-gray-400">Top recruiters who have viewed your profile</p>
          </div>
          <div className="text-right">
            <p className="text-cyan-400 font-semibold text-lg">{mockRecruiters.length}</p>
            <p className="text-gray-500 text-sm">Total Views</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockRecruiters.map((recruiter) => (
            <div key={recruiter.id} className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 rounded-xl p-5 border border-slate-600/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <img 
                    src={recruiter.profilePicture || `https://i.pravatar.cc/150?u=${recruiter.id}`} 
                    alt={recruiter.name}
                    className="w-12 h-12 rounded-full border-2 border-cyan-400"
                  />
                  <div>
                    <h3 className="text-white font-semibold text-lg">{recruiter.name}</h3>
                    <p className="text-cyan-400 text-sm font-medium">{recruiter.title}</p>
                    <p className="text-gray-300 text-sm font-bold">{recruiter.company}</p>
                    <p className="text-gray-400 text-xs">{recruiter.location} • {recruiter.experience} experience</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500 bg-slate-700/50 px-2 py-1 rounded-full">
                  {recruiter.viewedAt}
                </span>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-300 text-sm mb-2">{recruiter.description}</p>
                <div className="flex items-center space-x-4 text-xs">
                  <span className="text-cyan-400">
                    <span className="font-bold">Specializes:</span> {recruiter.specialization}
                  </span>
                  <span className="text-green-400">
                    <span className="font-bold">Hired:</span> {recruiter.hiredCount}+ engineers
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  <span className="truncate">{recruiter.email}</span>
                </div>
                <button 
                  onClick={() => window.location.href = `mailto:${recruiter.email}`}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm mb-3">Want to connect with more recruiters?</p>
          <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg">
            Upgrade to Premium
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2 font-poppins">Welcome, {user?.name}!</h1>
        <p className="text-gray-400 text-lg font-inter">Manage your developer profile and connect with recruiters</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-8 bg-slate-800/30 rounded-lg p-1">
        <button
          onClick={() => setActiveSection('profile')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeSection === 'profile'
              ? 'bg-cyan-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          Profile Analysis
        </button>
        <button
          onClick={() => setActiveSection('recruiters')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeSection === 'recruiters'
              ? 'bg-cyan-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          Recruiters
        </button>
        <button
          onClick={() => setActiveSection('messages')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeSection === 'messages'
              ? 'bg-cyan-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          Messages {unreadCount > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs ml-2">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Content Sections */}
      {activeSection === 'profile' ? renderProfileSection() : 
       activeSection === 'recruiters' ? renderRecruitersSection() : 
       <MessagesPage />}
    </div>
  );
};

export default CandidateDashboard;