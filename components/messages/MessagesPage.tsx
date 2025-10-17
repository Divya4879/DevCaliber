import React, { useState, useEffect } from 'react';
import { MessagingService, Message } from '../../services/messagingService';
import { useAuth } from '../../hooks/useAuth';

interface MessagesPageProps {
  onBack?: () => void;
}

const MessagesPage: React.FC<MessagesPageProps> = ({ onBack }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (user?.email) {
      const userMessages = MessagingService.getMessagesForUser(user.email);
      setMessages(userMessages);
    }
  }, [user?.email]);

  const handleMarkAsRead = (messageId: string) => {
    MessagingService.markAsRead(messageId);
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-cyan-800/30 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {onBack && (
              <button
                onClick={onBack}
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                ← Back
              </button>
            )}
            <h1 className="text-2xl font-bold text-white">Messages</h1>
            <span className="bg-cyan-600 text-white px-2 py-1 rounded-full text-sm">
              {messages.filter(m => !m.read).length} unread
            </span>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="max-w-4xl mx-auto p-6">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📬</div>
            <h2 className="text-xl font-semibold text-white mb-2">No Messages</h2>
            <p className="text-gray-400">You don't have any messages yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  message.read
                    ? 'bg-slate-800/30 border-slate-700/50'
                    : 'bg-cyan-900/20 border-cyan-600/50 shadow-lg'
                }`}
                onClick={() => !message.read && handleMarkAsRead(message.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-white">{message.from}</span>
                    {!message.read && (
                      <span className="bg-cyan-600 text-white px-2 py-1 rounded-full text-xs">
                        New
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date(message.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="text-gray-300 whitespace-pre-wrap">
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
