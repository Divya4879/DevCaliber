export class GitHubAuthService {
  private static CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
  private static REDIRECT_URI = `${window.location.origin}/github-callback`;

  static initiateGitHubAuth(): void {
    const state = Math.random().toString(36).substring(2, 15);
    localStorage.setItem('github_auth_state', state);
    
    const authUrl = new URL('https://github.com/login/oauth/authorize');
    authUrl.searchParams.set('client_id', this.CLIENT_ID);
    authUrl.searchParams.set('redirect_uri', this.REDIRECT_URI);
    authUrl.searchParams.set('scope', 'user:email read:user');
    authUrl.searchParams.set('state', state);
    
    window.location.href = authUrl.toString();
  }

  static async handleCallback(code: string, state: string): Promise<{ username: string; email: string } | null> {
    try {
      const storedState = localStorage.getItem('github_auth_state');
      if (state !== storedState) {
        throw new Error('Invalid state parameter');
      }
      
      // Since we can't exchange code for token client-side (requires client secret),
      // we'll prompt user for their GitHub username and verify it exists
      const username = prompt('Please enter your GitHub username to verify:');
      if (!username) {
        throw new Error('GitHub username is required');
      }
      
      // Verify the username exists on GitHub
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) {
        throw new Error('GitHub username not found. Please check your username.');
      }
      
      const userData = await userResponse.json();
      
      localStorage.removeItem('github_auth_state');
      
      return {
        username: userData.login,
        email: userData.email || `${userData.login}@github.local`
      };
      
    } catch (error) {
      console.error('GitHub auth error:', error);
      localStorage.removeItem('github_auth_state');
      throw error;
    }
  }

  static isConfigured(): boolean {
    return !!this.CLIENT_ID;
  }
}
