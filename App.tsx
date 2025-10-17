import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import AuthPage from './components/auth/AuthPage';
import RoleSelection from './components/onboarding/RoleSelection';
import CandidateDashboard from './components/candidate/CandidateDashboard';
import RecruiterDashboard from './components/recruiter/RecruiterDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import ChatPage from './components/chat/ChatPage';
import ChatBubble from './components/chat/ChatBubble';
import Header from './components/common/Header';
import { UserRole } from './types';
import LandingPage from './components/landing/LandingPage';
import Spinner from './components/common/Spinner';
import Footer from './components/common/Footer';
import GitHubCallback from './components/auth/GitHubCallback';

const App: React.FC = () => {
  const { user, role, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Check for GitHub callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const currentPath = window.location.pathname;
    
    if (currentPath === '/github-callback' && (urlParams.get('code') || urlParams.get('error'))) {
      setCurrentPage('github-callback');
    }
  }, []);

  // Handle return from GitHub authentication
  useEffect(() => {
    if (user && role) {
      const returnPath = localStorage.getItem('auth_return_path');
      const returnAction = localStorage.getItem('auth_return_action');
      
      if (returnPath === '/candidate-dashboard' && returnAction === 'github_analysis' && role === UserRole.CANDIDATE) {
        localStorage.removeItem('auth_return_path');
        localStorage.removeItem('auth_return_action');
      }
    }
  }, [user, role]);

  const renderContent = () => {
    // Check for GitHub callback FIRST (before any auth checks)
    const currentPath = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    
    if (currentPath === '/github-callback' && (urlParams.get('code') || urlParams.get('error'))) {
      return <GitHubCallback onComplete={() => {
        window.history.replaceState({}, document.title, '/');
        setCurrentPage('dashboard');
      }} />;
    }

    if (loading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <Spinner text="Loading your session..." />
        </div>
      );
    }

    if (!user) {
        if (showAuth) {
            return <AuthPage />;
        }
        return <LandingPage onGetStarted={() => setShowAuth(true)} />;
    }

    if (!role) {
      return <RoleSelection />;
    }

    // Handle chat page
    if (currentPage === 'chat') {
      return <ChatPage onBack={() => setCurrentPage('dashboard')} />;
    }

    switch (role) {
      case UserRole.CANDIDATE:
        return <CandidateDashboard />;
      case UserRole.RECRUITER:
        return <RecruiterDashboard onNavigateToChat={() => setCurrentPage('chat')} />;
      case UserRole.ADMIN:
        return <AdminDashboard onNavigateToChat={() => setCurrentPage('chat')} />;
      default:
        return <RoleSelection />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 font-sans flex flex-col">
      <Header onSignInClick={() => setShowAuth(true)} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      {!user && <Footer />}
      
      {/* Show chat bubble on dashboard pages only */}
      {user && role && currentPage !== 'chat' && (
        <ChatBubble onClick={() => setCurrentPage('chat')} />
      )}
    </div>
  );
};

export default App;
