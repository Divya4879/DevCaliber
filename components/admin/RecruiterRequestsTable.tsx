import React, { useState, useEffect } from 'react';
import { RecruiterRequestService, RecruiterRequest } from '../../services/recruiterRequestService';

const RecruiterRequestsTable: React.FC = () => {
  const [requests, setRequests] = useState<RecruiterRequest[]>([]);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = () => {
    const allRequests = RecruiterRequestService.getAllRequests();
    setRequests(allRequests.sort((a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime()));
  };

  const handleAction = async (requestId: string, action: 'approved' | 'denied' | 'blocked') => {
    setLoading(requestId);
    
    try {
      RecruiterRequestService.updateRequestStatus(requestId, action);
      loadRequests();
    } catch (error) {
      console.error('Failed to update request:', error);
    } finally {
      setLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-yellow-600 text-yellow-100',
      approved: 'bg-green-600 text-green-100',
      denied: 'bg-red-600 text-red-100',
      blocked: 'bg-gray-600 text-gray-100'
    };
    return badges[status as keyof typeof badges] || badges.pending;
  };

  if (requests.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">📋</div>
        <h3 className="text-xl font-semibold text-white mb-2">No Recruiter Requests</h3>
        <p className="text-gray-400">No recruiter verification requests have been submitted yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-700">
        <thead className="bg-slate-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              LinkedIn Profile
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Requested
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-slate-800 divide-y divide-slate-700">
          {requests.map((request) => (
            <tr key={request.id} className="hover:bg-slate-700">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-white">{request.userName}</div>
                  <div className="text-sm text-gray-400">{request.userEmail}</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <a
                  href={request.linkedinProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 text-sm break-all"
                >
                  {request.linkedinProfile}
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                {new Date(request.requestedAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(request.status)}`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {request.status === 'pending' ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAction(request.id, 'approved')}
                      disabled={loading === request.id}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs disabled:opacity-50"
                    >
                      ✓ Approve
                    </button>
                    <button
                      onClick={() => handleAction(request.id, 'denied')}
                      disabled={loading === request.id}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs disabled:opacity-50"
                    >
                      ✗ Deny
                    </button>
                    <button
                      onClick={() => handleAction(request.id, 'blocked')}
                      disabled={loading === request.id}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs disabled:opacity-50"
                    >
                      🚫 Block
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-500">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecruiterRequestsTable;
