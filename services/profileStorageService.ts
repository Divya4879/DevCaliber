import { GithubAnalysis } from '../types';

export interface SavedProfile {
  analysis: GithubAnalysis;
  badges: any[];
  githubUsername: string;
  userEmail: string;
  savedAt: string;
}

export class ProfileStorageService {
  private static STORAGE_KEY = 'devcaliber_saved_profiles';

  static saveProfile(userEmail: string, githubUsername: string, analysis: GithubAnalysis, badges: any[]): void {
    try {
      const profiles = this.getAllProfiles();
      
      const savedProfile: SavedProfile = {
        analysis,
        badges,
        githubUsername,
        userEmail,
        savedAt: new Date().toISOString()
      };

      // Remove any existing profile for this user
      const filteredProfiles = profiles.filter(p => p.userEmail !== userEmail);
      
      // Add the new profile
      filteredProfiles.push(savedProfile);
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredProfiles));
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  }

  static getSavedProfile(userEmail: string): SavedProfile | null {
    try {
      const profiles = this.getAllProfiles();
      return profiles.find(p => p.userEmail === userEmail) || null;
    } catch (error) {
      console.error('Failed to load saved profile:', error);
      return null;
    }
  }

  private static getAllProfiles(): SavedProfile[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load profiles:', error);
      return [];
    }
  }
}
