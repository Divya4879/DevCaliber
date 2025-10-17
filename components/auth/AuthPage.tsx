import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthPage: React.FC = () => {
  const { loginWithRedirect, isLoading } = useAuth0();

  const handleSignIn = async () => {
    try {
      await loginWithRedirect({
        authorizationParams: {
          scope: 'openid profile email'
        }
      });
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] animate-fade-in">
        <div className="w-full max-w-md p-8 space-y-8 bg-slate-800/30 rounded-lg shadow-2xl border border-cyan-800/50">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Sign in to DevCaliber
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Access the future of talent verification
            </p>
          </div>
          
          <div className="mt-8">
            <button
              onClick={handleSignIn}
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              {isLoading ? 'Signing in...' : 'Sign in with Auth0'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
