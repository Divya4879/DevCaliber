// Token Vault - Secure API management with rate limiting
interface TokenVaultData {
  dailyUsage: number;
  sessionUsage: number;
  lastReset: string;
  sessionStart: string;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: { session: number; daily: number };
  resetTime?: string;
}

class TokenVault {
  private static instance: TokenVault;
  
  // Secure API keys
  private readonly OPENROUTER_API_KEY: string;
  private readonly GEMINI_API_KEY: string;
  private readonly AUTH0_DOMAIN: string;
  private readonly AUTH0_CLIENT_ID: string;

  // Rate limits
  private readonly SESSION_LIMIT = 50;
  private readonly DAILY_LIMIT = 100;

  constructor() {
    // Environment validation
    this.OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
    this.GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;
    this.AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN;
    this.AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID;

    this.validateEnvironment();
  }

  static getInstance(): TokenVault {
    if (!TokenVault.instance) {
      TokenVault.instance = new TokenVault();
    }
    return TokenVault.instance;
  }

  private validateEnvironment(): void {
    const missing = [];
    if (!this.OPENROUTER_API_KEY) missing.push('VITE_OPENROUTER_API_KEY');
    if (!this.GEMINI_API_KEY) missing.push('GEMINI_API_KEY');
    if (!this.AUTH0_DOMAIN) missing.push('VITE_AUTH0_DOMAIN');
    if (!this.AUTH0_CLIENT_ID) missing.push('VITE_AUTH0_CLIENT_ID');

    if (missing.length > 0) {
      console.error('Missing environment variables:', missing.join(', '));
    }
  }

  // Get API keys securely
  getOpenRouterKey(): string { return this.OPENROUTER_API_KEY; }
  getGeminiKey(): string { return this.GEMINI_API_KEY; }
  getAuth0Config() { return { domain: this.AUTH0_DOMAIN, clientId: this.AUTH0_CLIENT_ID }; }

  // Rate limiting for chat only
  checkChatLimit(userEmail: string, userRole: string): RateLimitResult {
    // Admins have unlimited access
    if (userRole === 'admin') {
      return { allowed: true, remaining: { session: 999, daily: 999 } };
    }

    const key = `tokenVault_${userEmail}`;
    const now = new Date().toISOString();
    
    // Get existing data or create new
    let data: TokenVaultData = this.getUserData(key);
    
    // Check if we need to reset (24hrs from last reset)
    const lastReset = new Date(data.lastReset);
    const hoursSinceReset = (Date.now() - lastReset.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceReset >= 24) {
      data.dailyUsage = 0;
      data.lastReset = now;
    }

    // Check if new session (different day or >4hrs gap)
    const sessionStart = new Date(data.sessionStart);
    const hoursSinceSession = (Date.now() - sessionStart.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceSession >= 4 || new Date(now).toDateString() !== sessionStart.toDateString()) {
      data.sessionUsage = 0;
      data.sessionStart = now;
    }

    // Check limits
    const sessionRemaining = this.SESSION_LIMIT - data.sessionUsage;
    const dailyRemaining = this.DAILY_LIMIT - data.dailyUsage;

    if (data.sessionUsage >= this.SESSION_LIMIT) {
      const resetTime = new Date(sessionStart.getTime() + 4 * 60 * 60 * 1000).toISOString();
      return { 
        allowed: false, 
        remaining: { session: 0, daily: dailyRemaining },
        resetTime 
      };
    }

    if (data.dailyUsage >= this.DAILY_LIMIT) {
      const resetTime = new Date(lastReset.getTime() + 24 * 60 * 60 * 1000).toISOString();
      return { 
        allowed: false, 
        remaining: { session: sessionRemaining, daily: 0 },
        resetTime 
      };
    }

    return { 
      allowed: true, 
      remaining: { session: sessionRemaining, daily: dailyRemaining } 
    };
  }

  // Record chat usage
  recordChatUsage(userEmail: string, userRole: string): void {
    if (userRole === 'admin') return; // No limits for admin

    const key = `tokenVault_${userEmail}`;
    const data = this.getUserData(key);
    
    data.sessionUsage++;
    data.dailyUsage++;
    
    localStorage.setItem(key, JSON.stringify(data));
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  // Get user usage data
  private getUserData(key: string): TokenVaultData {
    const stored = localStorage.getItem(key) || sessionStorage.getItem(key);
    
    if (stored) {
      return JSON.parse(stored);
    }

    // Create new user data
    const now = new Date().toISOString();
    return {
      dailyUsage: 0,
      sessionUsage: 0,
      lastReset: now,
      sessionStart: now
    };
  }

  // Get usage stats for UI
  getUsageStats(userEmail: string, userRole: string) {
    if (userRole === 'admin') {
      return { session: '∞', daily: '∞', sessionUsed: 0, dailyUsed: 0 };
    }

    const limit = this.checkChatLimit(userEmail, userRole);
    return {
      session: `${this.SESSION_LIMIT - limit.remaining.session}/${this.SESSION_LIMIT}`,
      daily: `${this.DAILY_LIMIT - limit.remaining.daily}/${this.DAILY_LIMIT}`,
      sessionUsed: this.SESSION_LIMIT - limit.remaining.session,
      dailyUsed: this.DAILY_LIMIT - limit.remaining.daily
    };
  }

  // Format time until reset
  getTimeUntilReset(resetTime: string): string {
    const now = Date.now();
    const reset = new Date(resetTime).getTime();
    const diff = reset - now;
    
    if (diff <= 0) return 'now';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }
}

export default TokenVault.getInstance();
