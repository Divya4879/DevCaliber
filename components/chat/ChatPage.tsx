import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { generateChatResponse, validateMessageScope, ChatMessage, ChatContext } from '../../services/chatService';
import { mockCandidates } from '../../data/mockData';
import TokenVault from '../../services/tokenVault';

interface ChatPageProps {
  onBack?: () => void;
}

const ChatPage: React.FC<ChatPageProps> = ({ onBack }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionMemory, setSessionMemory] = useState<Record<string, any>>({});
  const [usageStats, setUsageStats] = useState({ session: '0/50', daily: '0/100' });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const userRole = user?.email === 'admin@testcredential.com' ? 'admin' : 
                  user?.email === 'recruiter@testcredential.com' ? 'recruiter' : 'candidate';

  const userData = userRole === 'candidate' ? 
    mockCandidates.find(c => c.email === user?.email) : null;

  useEffect(() => {
    // Update usage stats
    if (user?.email) {
      const stats = TokenVault.getUsageStats(user.email, userRole);
      setUsageStats({ session: stats.session, daily: stats.daily });
    }
  }, [user?.email, userRole, messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !user?.email) return;

    // Validate message scope
    if (!validateMessageScope(inputMessage, userRole)) {
      alert('I can only help with your own profile and career questions.');
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Update session memory with user preferences
    updateSessionMemory(inputMessage);

    const context: ChatContext = {
      userRole,
      userEmail: user.email,
      userData,
      sessionMemory
    };

    try {
      const response = await generateChatResponse([...messages, userMessage], context);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (content: string) => {
    // Split by double asterisks for bold text
    const parts = content.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // Remove asterisks and make bold
        const boldText = part.slice(2, -2);
        return <strong key={index} className="font-bold text-cyan-300">{boldText}</strong>;
      }
      
      // Handle line breaks
      const lines = part.split('\n');
      return lines.map((line, lineIndex) => (
        <span key={`${index}-${lineIndex}`}>
          {line}
          {lineIndex < lines.length - 1 && <br />}
        </span>
      ));
    });
  };

  const updateSessionMemory = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    // Extract preferences from user messages
    if (lowerMessage.includes('remote')) {
      setSessionMemory(prev => ({ ...prev, workPreference: 'remote' }));
    }
    if (lowerMessage.includes('on-site') || lowerMessage.includes('onsite')) {
      setSessionMemory(prev => ({ ...prev, workPreference: 'on-site' }));
    }
    if (lowerMessage.includes('salary')) {
      setSessionMemory(prev => ({ ...prev, discussedSalary: true }));
    }
  };

  const downloadChat = () => {
    const chatData = {
      user: user?.name,
      role: userRole,
      timestamp: new Date().toISOString(),
      messages: messages
    };
    
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devcaliber-chat-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    const chatText = messages.map(msg => 
      `${msg.role === 'user' ? 'You' : 'Agent'}: ${msg.content}`
    ).join('\n\n');
    
    navigator.clipboard.writeText(chatText);
    alert('Chat copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-cyan-800/30 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-white">DevCaliber Agent</h1>
              <p className="text-gray-400 capitalize">{userRole} Assistant</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={copyToClipboard}
              disabled={messages.length === 0}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50 transition-colors"
            >
              Copy Chat
            </button>
            <button
              onClick={downloadChat}
              disabled={messages.length === 0}
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 transition-colors"
            >
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-6 max-w-4xl mx-auto">
        <div className="space-y-4 mb-6">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🤖</div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Hi {user?.name}! I'm your DevCaliber Agent
              </h2>
              <p className="text-gray-400">
                {userRole === 'candidate' && 'Ask me about job opportunities, salary expectations, or career advice based on your profile.'}
                {userRole === 'recruiter' && 'Ask me about finding candidates, hiring needs, or talent market insights.'}
                {userRole === 'admin' && 'Ask me about platform analytics, candidate matching, or system insights.'}
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  ${message.role === 'assistant' ? 'w-[75%] max-w-none' : 'max-w-xs lg:max-w-md'} px-4 py-3 rounded-2xl
                  ${message.role === 'user' 
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white' 
                    : 'bg-slate-800/80 backdrop-blur-sm text-white border border-cyan-800/30'
                  }
                `}
              >
                <p className="text-sm leading-relaxed">
                  {message.role === 'assistant' ? formatMessage(message.content) : message.content}
                </p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800/80 backdrop-blur-sm border border-cyan-800/30 px-4 py-3 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-gray-400 text-sm">Agent is thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-cyan-800/30 p-4">
          <div className="flex space-x-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`Ask your ${userRole} assistant...`}
              className="flex-1 bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 disabled:opacity-50 transition-all duration-200"
            >
              Send
            </button>
          </div>
          <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
            <span>Chat Usage: Session {usageStats.session} | Daily {usageStats.daily}</span>
            <span>Session memory active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
