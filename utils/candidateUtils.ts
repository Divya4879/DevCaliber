import { mockCandidates } from '../data/mockData';

export interface RealCandidate {
  id: string;
  name: string;
  email: string;
  githubUsername: string;
  skills: string[];
  proficiency: string[];
  badges: any[];
  experience: string;
  location: string;
  profilePicture: string;
  githubAnalysis: any;
}

export function getAllCandidates(): any[] {
  const realCandidates = getRealCandidates();
  return [...mockCandidates, ...realCandidates];
}

function getRealCandidates(): RealCandidate[] {
  const candidateMap = new Map<string, RealCandidate>();
  
  // First pass: collect all analysis_ entries
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith('analysis_') && !key.includes('democandidate')) {
      try {
        const analysis = JSON.parse(localStorage.getItem(key) || '{}');
        const githubUsername = key.replace('analysis_', '');
        
        if (analysis && Object.keys(analysis).length > 0) {
          const userKey = `user_${githubUsername}`;
          const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
          
          const realCandidate: RealCandidate = {
            id: `real_${githubUsername}`,
            name: userData.name || githubUsername,
            email: userData.email || `${githubUsername}@github.com`,
            githubUsername: githubUsername,
            skills: analysis.keySkills?.map((s: any) => s.skill) || [],
            proficiency: analysis.keySkills?.map((s: any) => s.proficiency) || [],
            badges: generateBadgesFromAnalysis(analysis),
            experience: extractExperience(analysis.summary) || 'Not specified',
            location: userData.location || 'Not specified',
            profilePicture: `https://github.com/${githubUsername}.png`,
            githubAnalysis: analysis
          };
          
          candidateMap.set(githubUsername, realCandidate);
        }
      } catch (error) {
        console.error('Error parsing analysis data:', error);
      }
    }
  }
  
  // Second pass: override with saved profiles (more complete data)
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith('profile_') && !key.includes('democandidate')) {
      try {
        const savedProfile = JSON.parse(localStorage.getItem(key) || '{}');
        const githubUsername = key.replace('profile_', '');
        
        console.log('Processing saved profile for:', githubUsername, savedProfile);
        
        if (savedProfile.analysis && savedProfile.badges) {
          const realCandidate: RealCandidate = {
            id: `real_${githubUsername}`,
            name: savedProfile.username || githubUsername,
            email: `${githubUsername}@github.com`,
            githubUsername: githubUsername,
            skills: savedProfile.analysis.keySkills?.map((s: any) => s.skill) || [],
            proficiency: savedProfile.analysis.keySkills?.map((s: any) => s.proficiency) || [],
            badges: savedProfile.badges || [],
            experience: extractExperience(savedProfile.analysis.summary) || 'Not specified',
            location: 'Not specified',
            profilePicture: `https://github.com/${githubUsername}.png`,
            githubAnalysis: savedProfile.analysis
          };
          
          console.log('Created candidate with badges:', realCandidate.badges);
          
          // Override any existing entry (saved profiles are more complete)
          candidateMap.set(githubUsername, realCandidate);
        }
      } catch (error) {
        console.error('Error parsing saved profile:', error);
      }
    }
  }
  
  return Array.from(candidateMap.values());
}

function generateBadgesFromAnalysis(analysis: any): any[] {
  const badges: any[] = [];
  
  // Generate badges from keySkills if available
  if (analysis.keySkills && Array.isArray(analysis.keySkills)) {
    analysis.keySkills.forEach((skill: any) => {
      badges.push({
        skill: skill.skill,
        level: skill.proficiency,
        dateIssued: new Date().toLocaleDateString()
      });
    });
  }
  
  // If no keySkills, try to generate from techStack or other analysis data
  if (badges.length === 0 && analysis.techStack && Array.isArray(analysis.techStack)) {
    analysis.techStack.slice(0, 5).forEach((tech: string) => {
      badges.push({
        skill: tech,
        level: 'Intermediate', // Default level
        dateIssued: new Date().toLocaleDateString()
      });
    });
  }
  
  return badges;
}

function getSavedBadges(githubUsername: string): any[] {
  // Check for saved badges in localStorage
  const savedProfile = localStorage.getItem(`profile_${githubUsername}`);
  if (savedProfile) {
    try {
      const profileData = JSON.parse(savedProfile);
      return profileData.badges || [];
    } catch (error) {
      console.error('Error parsing saved profile:', error);
    }
  }
  return [];
}

function getSavedProfile(githubUsername: string): any | null {
  // Get complete saved profile data
  const savedProfile = localStorage.getItem(`profile_${githubUsername}`);
  if (savedProfile) {
    try {
      return JSON.parse(savedProfile);
    } catch (error) {
      console.error('Error parsing saved profile:', error);
    }
  }
  return null;
}

function extractExperience(summary: string): string | null {
  const experienceMatch = summary?.match(/(\d+)\+?\s*years?/i);
  return experienceMatch ? `${experienceMatch[1]} years` : null;
}
