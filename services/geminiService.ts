import { GoogleGenerativeAI } from "@google/generative-ai";
import { GithubAnalysis, GithubRepo } from '../types';

const genAI = new GoogleGenerativeAI('AIzaSyCwnRvOmSxSbmshERfZy_nNd5mZ0gvcPdw');

// Badge mapping system
const SKILL_BADGE_MAP: Record<string, string> = {
  'javascript': 'JS',
  'js': 'JS',
  'typescript': 'Typescript',
  'ts': 'Typescript',
  'python': 'Python',
  'react': 'React',
  'reactjs': 'React',
  'node.js': 'NodeJs',
  'nodejs': 'NodeJs',
  'node': 'NodeJs',
  'full stack': 'FullStack',
  'fullstack': 'FullStack',
  'full-stack': 'FullStack',
  'frontend': 'Frontend',
  'front-end': 'Frontend',
  'backend': 'Backend',
  'back-end': 'Backend',
  'web accessibility': 'WebAccessibility',
  'accessibility': 'WebAccessibility',
  'ui/ux': 'UI UX',
  'ui ux': 'UI UX',
  'ux': 'UI UX',
  'ui': 'UI UX'
};

export const getBadgeInfo = (skill: string, proficiency: string) => {
  const normalizedSkill = skill.toLowerCase();
  const mappedSkill = SKILL_BADGE_MAP[normalizedSkill];
  const normalizedProficiency = proficiency.toLowerCase();
  
  if (mappedSkill) {
    return {
      imagePath: `/skill-badges/${mappedSkill}-${normalizedProficiency}.png`,
      skill: mappedSkill,
      level: proficiency
    };
  }
  return null;
};

// Fetch real GitHub repositories
export const fetchGithubRepos = async (username: string): Promise<GithubRepo[]> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    const repos = await response.json();
    return repos.map((repo: any) => ({
      name: repo.name,
      description: repo.description || 'No description available',
      language: repo.language || 'Unknown',
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      html_url: repo.html_url
    }));
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    throw error;
  }
};

export const analyzeGithubProfile = async (username: string, repos?: GithubRepo[]): Promise<GithubAnalysis | null> => {
  try {
    const repositories = repos || await fetchGithubRepos(username);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const repoData = repositories.map(r => ({
      name: r.name,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
    }));

    const availableSkills = Object.keys(SKILL_BADGE_MAP).join(', ');
    const prompt = `Analyze this GitHub profile for user "${username}":

Repository Data: ${JSON.stringify(repoData, null, 2)}

Focus ONLY on these skills that we have badges for: ${availableSkills}

Provide analysis in JSON format with:
1. techStack: Array of technologies used (only from available skills)
2. skills: Array of {skill, proficiency} objects where:
   - skill: must be from available skills list
   - proficiency: Beginner/Intermediate/Advanced/Expert
3. topRepositories: Top 3 repos with {name, justification}
4. codeQuality: {rating: 1-10, justification}
5. projectComplexity: {rating: 1-10, justification}
6. documentation: {rating: 1-10, justification}
7. summary: Professional paragraph summary

Return only valid JSON.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const cleanJson = text.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleanJson) as GithubAnalysis;
  } catch (error) {
    console.error("Error analyzing GitHub profile:", error);
    return null;
  }
};

// Remove old badge generation - now using local images
export const generateSkillBadge = async (skill: string, proficiency: string): Promise<string | null> => {
  const badgeInfo = getBadgeInfo(skill, proficiency);
  return badgeInfo ? badgeInfo.imagePath : null;
};

export const verifyRecruiterProfile = async (linkedinUrl: string): Promise<boolean> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `Analyze this LinkedIn URL: ${linkedinUrl}
    
Based on the URL structure, determine if this person is likely in a recruiting/hiring role.

Respond with JSON: {"isRecruiter": boolean, "justification": "brief explanation"}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const cleanJson = text.replace(/```json\n?|\n?```/g, '').trim();
    const parsed = JSON.parse(cleanJson);
    return parsed.isRecruiter;
  } catch (error) {
    console.error("Error verifying recruiter profile:", error);
    return false;
  }
};