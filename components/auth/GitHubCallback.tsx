import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { GitHubAuthService } from '../../services/githubAuthService';
import Spinner from '../common/Spinner';

interface GitHubCallbackProps {
  onComplete: () => void;
}

const GitHubCallback: React.FC<GitHubCallbackProps> = ({ onComplete }) => {
  const { user } = useAuth0();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Connecting your GitHub account...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const error = urlParams.get('error');

        if (error) {
          throw new Error(`GitHub OAuth error: ${error}`);
        }

        if (!code || !state) {
          throw new Error('Missing authorization code or state');
        }

        setMessage('Verifying GitHub authentication...');
        const githubUser = await GitHubAuthService.handleCallback(code, state);

        if (!githubUser) {
          throw new Error('Failed to authenticate with GitHub');
        }

        setMessage('GitHub account connected successfully!');
        setStatus('success');
        
        // Store GitHub username locally
        localStorage.setItem('github_username', githubUser.username);
        localStorage.setItem('github_email', githubUser.email);
        
        setTimeout(() => {
          window.history.replaceState({}, document.title, window.location.pathname);
          onComplete();
        }, 2000);

      } catch (error) {
        console.error('GitHub callback error:', error);
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Failed to connect GitHub account');
        
        setTimeout(() => {
          window.history.replaceState({}, document.title, window.location.pathname);
          onComplete();
        }, 3000);
      }
    };

    handleCallback();
  }, [user, onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="bg-slate-800/50 p-8 rounded-lg border border-cyan-800/50 text-center max-w-md">
        <div className="mb-6">
          {status === 'processing' && <Spinner />}
          {status === 'success' && <div className="text-6xl mb-4">✅</div>}
          {status === 'error' && <div className="text-6xl mb-4">❌</div>}
        </div>
        
        <h2 className="text-xl font-bold text-white mb-4">
          {status === 'processing' && 'Connecting GitHub'}
          {status === 'success' && 'Success!'}
          {status === 'error' && 'Connection Failed'}
        </h2>
        
        <p className="text-gray-300">{message}</p>
        
        {status === 'error' && (
          <button
            onClick={onComplete}
            className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Return to Dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default GitHubCallback;
