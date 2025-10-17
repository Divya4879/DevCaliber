export enum UserRole {
  CANDIDATE = 'CANDIDATE',
  RECRUITER = 'RECRUITER',
  ADMIN = 'ADMIN',
}

export interface User {
  uid: string;
  email: string | null;
  name?: string;
  githubUsername?: string;
}

export interface GithubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

export interface GithubAnalysis {
  techStack: string[];
  keySkills: {
    skill: string;
    proficiency: string;
  }[];
  topRepositories: {
    name: string;
    url: string;
    justification: string;
  }[];
  codeQuality: {
    rating: number;
    justification: string;
  };
  projectComplexity: {
    rating: number;
    justification: string;
  };
  documentation: {
    rating: number;
    justification: string;
  };
  summary: string;
}

export interface CandidateProfile {
  id: string;
  name: string;
  email: string;
  githubUsername: string;
  analysis: GithubAnalysis | null;
  badges: string[];
}