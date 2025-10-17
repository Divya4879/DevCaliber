import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export interface RecruiterVerification {
  isRecruiter: boolean;
  confidence: number;
  reason: string;
  jobTitle?: string;
  company?: string;
}

export class RecruiterVerificationService {
  static async verifyRecruiterFromLinkedIn(linkedinUrl: string): Promise<RecruiterVerification> {
    try {
      // Use ScrapingBee free tier to fetch LinkedIn profile content
      const scrapingResponse = await fetch(`https://app.scrapingbee.com/api/v1/?api_key=free&url=${encodeURIComponent(linkedinUrl)}&render_js=false`);
      
      if (!scrapingResponse.ok) {
        // Fallback: Extract username and use mock analysis
        const usernameMatch = linkedinUrl.match(/\/in\/([^\/]+)/);
        if (usernameMatch) {
          const username = usernameMatch[1];
          return this.analyzeLinkedInUsername(username);
        }
        throw new Error('Failed to fetch LinkedIn profile');
      }
      
      const profileHtml = await scrapingResponse.text();
      
      // Extract key information from HTML
      const profileText = this.extractProfileInfo(profileHtml);
      
      return this.verifyRecruiterFromText(profileText);
      
    } catch (error) {
      console.error('LinkedIn scraping failed:', error);
      // Fallback to username analysis
      const usernameMatch = linkedinUrl.match(/\/in\/([^\/]+)/);
      if (usernameMatch) {
        return this.analyzeLinkedInUsername(usernameMatch[1]);
      }
      
      return {
        isRecruiter: false,
        confidence: 0,
        reason: 'Unable to access LinkedIn profile. Please try entering your profile information manually.'
      };
    }
  }

  private static extractProfileInfo(html: string): string {
    // Extract text content from common LinkedIn profile elements
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : '';
    
    // Look for job titles and company names in the HTML
    const jobTitleMatches = html.match(/(?:title|position|role)[^>]*>([^<]+)/gi) || [];
    const companyMatches = html.match(/(?:company|organization)[^>]*>([^<]+)/gi) || [];
    
    return `
      Profile Title: ${title}
      Job Information: ${jobTitleMatches.join(', ')}
      Company Information: ${companyMatches.join(', ')}
      Profile URL indicates professional networking presence
    `.trim();
  }

  private static async analyzeLinkedInUsername(username: string): Promise<RecruiterVerification> {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      
      const prompt = `
        Analyze this LinkedIn username and determine if this person might be a recruiter: ${username}
        
        Consider:
        - Username patterns that suggest recruiting (hr, talent, recruiter, etc.)
        - Professional naming conventions
        - The fact they have a LinkedIn profile (professional networking)
        
        Since this is limited information, be more lenient but still verify professional intent.
        
        Respond in JSON format:
        {
          "isRecruiter": boolean,
          "confidence": number (0-100),
          "reason": "explanation based on username analysis",
          "jobTitle": "estimated role",
          "company": "unknown"
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const verification = JSON.parse(jsonMatch[0]);
        return verification;
      }
      
      throw new Error('Invalid response format');
      
    } catch (error) {
      return {
        isRecruiter: false,
        confidence: 30,
        reason: 'Limited verification possible from LinkedIn URL alone. Please provide more profile details.'
      };
    }
  }

  static async verifyRecruiterFromText(profileText: string): Promise<RecruiterVerification> {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      
      const prompt = `
        Analyze this profile information and determine if this person is a legitimate recruiter:
        
        Profile Info: ${profileText}
        
        Look for:
        - Job titles with recruiting keywords (recruiter, talent acquisition, HR, hiring manager, etc.)
        - Company names that are real businesses
        - Professional recruiting experience
        - Legitimate recruiting responsibilities
        
        Respond in JSON format:
        {
          "isRecruiter": boolean,
          "confidence": number (0-100),
          "reason": "detailed explanation",
          "jobTitle": "current job title",
          "company": "current company"
        }
        
        Be strict - only approve clear recruiting professionals.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const verification = JSON.parse(jsonMatch[0]);
        return verification;
      }
      
      throw new Error('Invalid response format');
      
    } catch (error) {
      console.error('Recruiter verification failed:', error);
      return {
        isRecruiter: false,
        confidence: 0,
        reason: 'Failed to analyze profile information. Please try again.'
      };
    }
  }
}
