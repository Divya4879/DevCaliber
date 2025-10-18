// Fine-Grained RAG - Filter data BEFORE AI processing
import { mockCandidates, mockRecruiters } from '../data/mockData';

interface UserPermissions {
  userRole: 'candidate' | 'recruiter' | 'admin';
  userEmail: string;
}

export class RAGService {
  // Filter data BEFORE sending to AI - AI only sees authorized data
  static getAuthorizedData(permissions: UserPermissions) {
    const { userRole, userEmail } = permissions;

    if (userRole === 'candidate') {
      // Candidates only see their own data
      const userCandidate = mockCandidates.find(c => c.email === userEmail);
      return {
        candidates: userCandidate ? [userCandidate] : [],
        recruiters: mockRecruiters // Candidates can see all recruiters
      };
    }

    if (userRole === 'recruiter') {
      // Recruiters see all mock candidates only
      return {
        candidates: mockCandidates,
        recruiters: mockRecruiters
      };
    }

    if (userRole === 'admin') {
      // Admins see all mock data only
      return {
        candidates: mockCandidates,
        recruiters: mockRecruiters
      };
    }

    return { candidates: [], recruiters: [] };
  }

  // Build context with ONLY authorized data
  static buildSecureContext(permissions: UserPermissions): string {
    const { candidates, recruiters } = this.getAuthorizedData(permissions);
    
    if (permissions.userRole === 'candidate') {
      const userCandidate = candidates[0];
      if (!userCandidate) return 'No profile data available';
      
      const recruiterList = recruiters.map(r => 
        `- ${r.name} (${r.title} at ${r.company}) - ${r.location}, ${r.experience} experience, specializes in ${r.specialization}`
      ).join('\n');
      
      return `Your Profile:
Name: ${userCandidate.name}
Skills: ${userCandidate.skills?.join(', ') || 'None'}
Experience: ${userCandidate.experience || 'Not specified'}
Location: ${userCandidate.location || 'Not specified'}

Available Recruiters (${recruiters.length} total):
${recruiterList}

IMPORTANT: Only provide information about these specific recruiters. Do not create or mention any other recruiters.`;
    }

    if (permissions.userRole === 'recruiter') {
      // Limit to exactly what's shown in dashboard - first 16 candidates only
      const dashboardCandidates = candidates.slice(0, 16);
      const candidateList = dashboardCandidates.map(c => {
        return `**${c.name}** (${c.email})
  📍 Location: ${c.location || 'Not specified'}
  💼 Experience: ${c.experience || 'Not specified'}
  🔗 GitHub: ${c.githubUsername}
  
  **Skills & Proficiency:**
  ${c.skills?.map((skill, i) => `• ${skill}: ${c.proficiency?.[i] || 'Not specified'}`).join('\n  ') || 'No skills'}
  
  ---`;
      }).join('\n\n');
      
      return `TALENT POOL - AVAILABLE CANDIDATES (${dashboardCandidates.length} total):

${candidateList}

MESSAGING SCOPE: You can ONLY send messages to these ${dashboardCandidates.length} candidates listed above. 
IMPORTANT: When sending messages, specify the exact candidate name from this list.`;
    }

    if (permissions.userRole === 'admin') {
      const recruiterList = recruiters.map(r => 
        `**${r.name}** (${r.title} at ${r.company})
  📍 ${r.location} | 💼 ${r.experience} experience
  🎯 Specializes in: ${r.specialization}
  📊 Hired: ${r.hiredCount}+ engineers
  📧 Email: ${r.email}
  📸 Profile: ${r.profilePicture}
  📝 ${r.description}`
      ).join('\n\n');
      
      const candidateList = candidates.map(c => {
        const badgeDetails = c.badges?.map(b => `${b.skill} (${b.level}) - Issued: ${b.dateIssued}`).join('\n    ') || 'No badges';
        const techStack = c.githubAnalysis?.techStack?.join(', ') || 'Not specified';
        const topRepos = c.githubAnalysis?.topRepositories?.map(repo => `${repo.name}: ${repo.justification}`).join('\n    ') || 'No repositories';
        
        return `**${c.name}** (${c.email})
  📍 Location: ${c.location || 'Not specified'}
  💼 Experience: ${c.experience || 'Not specified'}
  🔗 GitHub: ${c.githubUsername}
  📸 Profile Picture: ${c.profilePicture}
  
  **Skills & Proficiency:**
  ${c.skills?.map((skill, i) => `• ${skill}: ${c.proficiency?.[i] || 'Not specified'}`).join('\n  ') || 'No skills'}
  
  **Verified Badges:**
  ${badgeDetails}
  
  **Tech Stack:** ${techStack}
  
  **GitHub Analysis Summary:**
  ${c.githubAnalysis?.summary || 'No analysis available'}
  
  **Top Repositories:**
  ${topRepos}
  
  **Code Quality:** ${c.githubAnalysis?.codeQuality?.rating || 'N/A'}/10 - ${c.githubAnalysis?.codeQuality?.justification || 'No rating'}
  
  ---`;
      }).join('\n\n');
      
      return `Platform Overview:
- Total Candidates: ${candidates.length}
- Total Recruiters: ${recruiters.length}

**COMPLETE CANDIDATE PROFILES:**
${candidateList}

**COMPLETE RECRUITER PROFILES:**
${recruiterList}

SCOPE: Full dashboard-style profiles with badges, images, GitHub analysis, and complete formatting.`;
    }

    return 'No data available';
  }

  private static getUniqueSkills(candidates: any[]): string {
    const skills = new Set<string>();
    candidates.forEach(candidate => {
      candidate.skills?.forEach((skill: string) => skills.add(skill));
    });
    return Array.from(skills).join(', ');
  }

  private static getUniqueLocations(candidates: any[]): string {
    const locations = new Set<string>();
    candidates.forEach(candidate => {
      if (candidate.location) locations.add(candidate.location);
    });
    return Array.from(locations).join(', ');
  }
}
