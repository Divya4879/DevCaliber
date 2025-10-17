export interface LinkedInProfile {
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  positions: {
    title: string;
    companyName: string;
    isCurrent: boolean;
  }[];
  industry: string;
}

export class LinkedInAuthService {
  private static CLIENT_ID = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
  private static REDIRECT_URI = `${window.location.origin}/linkedin-callback`;
  
  static initiateLinkedInAuth(): void {
    const state = Math.random().toString(36).substring(2, 15);
    localStorage.setItem('linkedin_auth_state', state);
    
    const authUrl = new URL('https://www.linkedin.com/oauth/v2/authorization');
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('client_id', this.CLIENT_ID);
    authUrl.searchParams.set('redirect_uri', this.REDIRECT_URI);
    authUrl.searchParams.set('state', state);
    authUrl.searchParams.set('scope', 'r_liteprofile r_emailaddress');
    
    window.location.href = authUrl.toString();
  }

  static async verifyRecruiter(profile: LinkedInProfile): Promise<{ isRecruiter: boolean; reason: string }> {
    const recruiterKeywords = [
      'recruiter', 'talent', 'hr', 'human resources', 'hiring', 
      'talent acquisition', 'staffing', 'headhunter', 'sourcing'
    ];
    
    // Check current job title
    const currentPosition = profile.positions.find(p => p.isCurrent);
    if (currentPosition) {
      const titleLower = currentPosition.title.toLowerCase();
      const hasRecruiterTitle = recruiterKeywords.some(keyword => 
        titleLower.includes(keyword)
      );
      
      if (hasRecruiterTitle) {
        return { 
          isRecruiter: true, 
          reason: `Verified as ${currentPosition.title} at ${currentPosition.companyName}` 
        };
      }
    }
    
    // Check headline
    const headlineLower = profile.headline.toLowerCase();
    const hasRecruiterHeadline = recruiterKeywords.some(keyword => 
      headlineLower.includes(keyword)
    );
    
    if (hasRecruiterHeadline) {
      return { 
        isRecruiter: true, 
        reason: `Verified from LinkedIn headline: ${profile.headline}` 
      };
    }
    
    return { 
      isRecruiter: false, 
      reason: 'No recruiting-related role found in LinkedIn profile' 
    };
  }

  static isConfigured(): boolean {
    return !!this.CLIENT_ID;
  }
}
