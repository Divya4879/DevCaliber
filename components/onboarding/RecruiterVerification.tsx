import React, { useState, useEffect } from 'react';
import { RecruiterRequestService } from '../../services/recruiterRequestService';
import { useAuth } from '../../hooks/useAuth';
import Spinner from '../common/Spinner';

const RecruiterVerification: React.FC = () => {
  const { user } = useAuth();
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [requestStatus, setRequestStatus] = useState<'none' | 'pending' | 'approved' | 'denied' | 'blocked'>('none');

  useEffect(() => {
    if (user?.email) {
      const existingRequest = RecruiterRequestService.getUserRequestStatus(user.email);
      if (existingRequest) {
        setRequestStatus(existingRequest.status);
      }
    }
  }, [user?.email]);

  const handleSubmitRequest = async () => {
    if (!linkedinUrl.trim()) {
      setError('Please enter your LinkedIn profile URL');
      return;
    }

    if (!user?.email || !user?.name) {
      setError('User information not available');
      return;
    }

    setLoading(true);
    setError('');

    try {
      RecruiterRequestService.submitRequest(
        user.email,
        user.name,
        linkedinUrl
      );
      
      setRequestStatus('pending');
    } catch (err) {
      setError('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (requestStatus === 'blocked') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-red-900/50 rounded-lg p-8 border border-red-500 text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-3xl font-bold text-white mb-4">Access Blocked</h2>
          <p className="text-red-300">
            Your recruiter application has been blocked. Please contact support if you believe this is an error.
          </p>
        </div>
      </div>
    );
  }

  if (requestStatus === 'denied') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-yellow-900/50 rounded-lg p-8 border border-yellow-500 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-3xl font-bold text-white mb-4">Application Denied</h2>
          <p className="text-yellow-300 mb-6">
            Your recruiter application was not approved. You can choose a different role or contact support.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Choose Different Role
          </button>
        </div>
      </div>
    );
  }

  if (requestStatus === 'pending') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-blue-900/50 rounded-lg p-8 border border-blue-500 text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h2 className="text-3xl font-bold text-white mb-4">Application Under Review</h2>
          <p className="text-blue-300 mb-4">
            Your recruiter application is being reviewed by our admin team.
          </p>
          <p className="text-gray-400 text-sm">
            You'll be notified once the review is complete. This usually takes 1-2 business days.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-slate-800/50 rounded-lg p-8 border border-cyan-800/50">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">Recruiter Application</h2>
        <p className="text-gray-300 mb-6 text-center">
          Submit your LinkedIn profile for admin verification to access recruiter features.
        </p>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-300">
            LinkedIn Profile URL *
          </label>
          <input
            type="url"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            placeholder="https://linkedin.com/in/your-profile"
            className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <p className="text-sm text-gray-400">
            Our admin will manually verify your recruiting role from your LinkedIn profile.
          </p>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-300">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmitRequest}
          disabled={loading}
          className="w-full mt-6 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white font-medium rounded-lg transition-colors"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <Spinner />
              <span>Submitting...</span>
            </div>
          ) : (
            'Submit for Review'
          )}
        </button>

        <p className="text-xs text-gray-400 mt-4 text-center">
          Admin will review your LinkedIn profile and approve legitimate recruiting professionals.
        </p>
      </div>
    </div>
  );
};

export default RecruiterVerification;
