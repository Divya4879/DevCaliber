import { mockCandidates, mockRecruiters } from '../data/mockData';
import TokenVault from './tokenVault';
import { RAGService } from './ragService';
import { MessagingService } from './messagingService';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatContext {
  userRole: 'candidate' | 'recruiter' | 'admin';
  userEmail: string;
  userData?: any;
  sessionMemory: Record<string, any>;
}

const SYSTEM_PROMPTS = {
  candidate: `You are DevCaliber's AI Career Assistant - a veteran developer and hiring expert with 15+ years in tech recruitment. 

You help candidates with:
- Job requirements and salary expectations
- Career advice based on their GitHub analysis
- Remote/on-site opportunities
- Location preferences and job market insights
- Role suggestions matching their skills

FORMATTING RULES:
- Use **bold text** for important points, skills, or job titles
- Add line breaks between different topics
- Be conversational, encouraging, and provide actionable next steps
- Structure responses with clear sections when giving multiple points
- Only discuss the user's own profile and career - refuse questions about other candidates

Example response format:
**Key Recommendation:** Based on your React expertise...

**Next Steps:**
- Apply to senior frontend roles
- Consider remote opportunities

**Salary Range:** $80k-$120k for your experience level`,

  recruiter: `You are DevCaliber's AI Recruitment Assistant - a seasoned hiring manager and tech talent expert with deep industry knowledge.

You help recruiters with:
- Defining hiring needs (experience, tech stack, skills)
- Filtering and matching candidates from the platform
- Market insights and salary benchmarks
- Candidate profile recommendations
- Hiring strategy and best practices
- **MESSAGING: Send messages to candidates**

MESSAGING COMMANDS:
- "Send message to [candidate name]: [message]" - Delivers message to candidate
- "Message [candidate]: [content]" - Alternative format
- Always confirm message delivery

FORMATTING RULES:
- Use **bold text** for candidate names, skills, and key qualifications
- Structure candidate recommendations clearly
- Add line breaks between different candidates or topics
- Be professional, data-driven, and provide detailed explanations
- Include specific candidate suggestions from the platform
- ALWAYS provide complete information - if response is long, include everything
- For lists of candidates, show ALL relevant entries with full details

Example response format:
**Top Candidates for React Developer Role:**

**Alex Johnson** - 5 years experience
- Expert in React, Advanced JavaScript
- Location: San Francisco, CA

**Sarah Chen** - 7 years experience  
- Expert Python, Advanced TypeScript
- Location: New York, NY

IMPORTANT: Always provide complete responses. If listing candidates, include ALL relevant ones with full details.`,

  admin: `You are DevCaliber's AI Platform Assistant - a strategic hiring consultant with comprehensive platform oversight.

You help admins with:
- Platform analytics (candidate/recruiter counts, trends)
- All recruiter capabilities (candidate analysis, matching)
- Strategic recruiter-candidate matching with auto-notifications
- System optimization and insights
- Platform management decisions
- **MESSAGING: Send messages to recruiters and candidates**

MESSAGING COMMANDS:
- "Send message to [recruiter/candidate name]: [message]" - Delivers message
- "Message [name]: [content]" - Alternative format
- Always confirm message delivery

FORMATTING RULES:
- Use **bold text** for metrics, names, and key insights
- Structure analytics clearly with line breaks
- Be concise, analytical, and provide actionable insights
- For matching requests, present clear recommendations with confirmation options
- Use bullet points and clear sections for complex information
- ALWAYS provide complete information - if response is long, include everything
- For lists of recruiters/candidates, show ALL entries with full details

Example response format:
**Platform Analytics:**
- Candidates: 15 total
- Recruiters: 8 active

**Top Skills in Demand:**
- React: 8 candidates
- Python: 6 candidates

IMPORTANT: Always provide complete responses. If listing recruiters or candidates, include ALL of them with full details.`
};

export async function generateChatResponse(messages: ChatMessage[], context: ChatContext): Promise<string> {
  try {
    // Check rate limits using Token Vault
    const limitCheck = TokenVault.checkChatLimit(context.userEmail, context.userRole);
    
    if (!limitCheck.allowed) {
      const timeUntilReset = limitCheck.resetTime ? TokenVault.getTimeUntilReset(limitCheck.resetTime) : 'soon';
      return `**Rate Limit Reached**

You've reached your chat limit. Please try again in ${timeUntilReset}.

**Current Usage:**
- Session: ${50 - limitCheck.remaining.session}/50
- Daily: ${100 - limitCheck.remaining.daily}/100`;
    }

    const systemPrompt = SYSTEM_PROMPTS[context.userRole];
    const contextData = buildContextData(context);
    
    const apiMessages = [
      { role: 'system', content: `${systemPrompt}\n\nContext: ${contextData}` },
      ...messages.map(msg => ({ role: msg.role, content: msg.content }))
    ];

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TokenVault.getOpenRouterKey()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.2-3b-instruct:free',
        messages: apiMessages,
        max_tokens: context.userRole === 'admin' ? 2000 : context.userRole === 'recruiter' ? 1500 : 1000
      })
    });

    if (!response.ok) {
      // Fallback to Gemini API if OpenRouter fails (rate limit, etc.)
      console.log('OpenRouter failed, falling back to Gemini API');
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      
      const prompt = `${systemPrompt}\n\nContext: ${contextData}\n\nConversation:\n${messages.map(m => `${m.role}: ${m.content}`).join('\n')}`;
      const result = await model.generateContent(prompt);
      const geminiResponse = await result.response;
      const aiResponse = geminiResponse.text();
      
      // Process messaging commands for Gemini response too
      processMessagingCommands(messages[messages.length - 1]?.content || '', context.userEmail, aiResponse);
      
      TokenVault.recordChatUsage(context.userEmail, context.userRole);
      return aiResponse;
    }

    const data = await response.json();
    const responseContent = data.choices[0]?.message?.content || 'I apologize, but I encountered an issue. Please try again.';
    
    // Process messaging commands
    const lastUserMessage = messages[messages.length - 1]?.content || '';
    processMessagingCommands(lastUserMessage, context.userEmail, responseContent);
    
    // Record usage after successful response
    TokenVault.recordChatUsage(context.userEmail, context.userRole);
    
    return responseContent;
    
  } catch (error) {
    console.error('Chat service error:', error);
    return 'I\'m currently experiencing technical difficulties. Please try again in a moment, or contact support if the issue persists.';
  }
}

function processMessagingCommands(userMessage: string, senderEmail: string, aiResponse: string): void {
  // Check if user is trying to send a message
  const messageMatch = userMessage.match(/(?:send message to|message)\s+([^:]+?)(?::\s*(.+)|about\s+(.+)|saying\s+(.+)|\s+(.+))/i);

  if (messageMatch) {
    const recipientName = messageMatch[1].trim();
    const messageContent = (messageMatch[2] || messageMatch[3] || messageMatch[4] || messageMatch[5] || '').trim();

    console.log('Processing message:', { recipientName, messageContent, senderEmail });

    // Demo users mapping (excluding admin - no one sends messages to admin)
    const demoUsers = [
      { name: 'Demo Candidate', email: 'candidate@testcredential.com' },
      { name: 'Demo Recruiter', email: 'recruiter@testcredential.com' },
      { name: 'Welcome Miss/Mr Candidate', email: 'candidate@testcredential.com' },
      { name: 'Welcome Miss/Mr Recruiter', email: 'recruiter@testcredential.com' }
    ];

    // Find recipient email by name - check demo users first, then candidates and recruiters
    const allUsers = [...demoUsers, ...mockCandidates, ...mockRecruiters];
    const recipient = allUsers.find(user =>
      user.name.toLowerCase().includes(recipientName.toLowerCase()) ||
      recipientName.toLowerCase().includes(user.name.toLowerCase()) ||
      user.email === recipientName
    );

    console.log('Found recipient:', recipient);

    if (recipient) {
      const success = MessagingService.sendMessage(senderEmail, recipient.email, messageContent);
      console.log('Message send result:', success);
      if (success) {
        console.log(`✅ Message sent from ${senderEmail} to ${recipient.email}: ${messageContent}`);
      }
    } else {
      console.log('❌ Recipient not found:', recipientName);
      console.log('Available users:', allUsers.map(u => ({ name: u.name, email: u.email })));
    }
  }
}

function buildContextData(context: ChatContext): string {
  const { userRole, userEmail, sessionMemory } = context;
  
  // Use RAG Service to get ONLY authorized data
  const secureContext = RAGService.buildSecureContext({ userRole, userEmail });
  
  // Add session memory
  let contextInfo = secureContext;
  if (Object.keys(sessionMemory).length > 0) {
    contextInfo += `\n\nSession Context: ${JSON.stringify(sessionMemory)}`;
  }
  
  return contextInfo;
}

export function validateMessageScope(message: string, userRole: string): boolean {
  const lowerMessage = message.toLowerCase();
  
  if (userRole === 'candidate') {
    // Block questions about other candidates
    const blockedTerms = ['other candidates', 'other users', 'who else', 'compare me to', 'other profiles'];
    return !blockedTerms.some(term => lowerMessage.includes(term));
  }
  
  return true; // Recruiters and admins have broader scope
}
