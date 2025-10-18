import React from 'react';
import { GithubAnalysis } from '../../types';

interface AnalysisDisplayProps {
  analysis: GithubAnalysis | null;
  githubUsername?: string;
}

// Format text with **bold** and line breaks
const formatText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return <strong key={index} className="font-bold text-cyan-300">{boldText}</strong>;
    }
    
    const lines = part.split('\n');
    return lines.map((line, lineIndex) => (
      <span key={`${index}-${lineIndex}`}>
        {line}
        {lineIndex < lines.length - 1 && <br />}
      </span>
    ));
  });
};

const RatingCircle: React.FC<{ rating: number }> = ({ rating }) => {
    const circumference = 2 * Math.PI * 20; // 20 is the radius
    const offset = circumference - (rating / 10) * circumference;
    const colorClass = rating >= 8 ? 'text-cyan-400' : rating >= 5 ? 'text-yellow-400' : 'text-red-400';

    return (
        <div className="relative w-16 h-16">
            <svg className="w-full h-full" viewBox="0 0 44 44">
                <circle
                    className="text-slate-700"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="20"
                    cx="22"
                    cy="22"
                />
                <circle
                    className={colorClass}
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="20"
                    cx="22"
                    cy="22"
                    transform="rotate(-90 22 22)"
                />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">
                {rating}/10
            </span>
        </div>
    );
};

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis, githubUsername }) => {
  if (!analysis) {
    return <p className="text-center text-gray-400">No analysis data available.</p>;
  }

  return (
    <div className="space-y-8 animate-fade-in">
        {/* Summary */}
        <div>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-400 mb-2">AI Summary</h3>
            <div className="text-gray-300 bg-slate-800/30 p-4 rounded-lg border border-cyan-800/50 leading-relaxed">
              {formatText(analysis.summary)}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
                 {/* Key Skills */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-3">Key Skills</h3>
                    <ul className="space-y-2">
                        {(analysis.keySkills || analysis.skills || []).map(({ skill, proficiency }) => (
                        <li key={skill} className="bg-slate-800/30 p-3 rounded-lg flex justify-between items-center border border-cyan-800/50">
                            <span className="font-medium text-gray-200">
                              {skill === 'javascript' ? 'JavaScript' :
                               skill === 'typescript' ? 'TypeScript' :
                               skill === 'nodejs' || skill === 'node.js' ? 'Node.js' :
                               skill === 'reactjs' || skill === 'react' ? 'React' :
                               skill === 'python' ? 'Python' :
                               skill === 'full stack' || skill === 'fullstack' ? 'Full Stack' :
                               skill === 'frontend' || skill === 'front-end' ? 'Frontend' :
                               skill === 'backend' || skill === 'back-end' ? 'Backend' :
                               skill === 'ui/ux' || skill === 'ux' || skill === 'ui' ? 'UI/UX' :
                               skill.charAt(0).toUpperCase() + skill.slice(1)}
                            </span>
                            <span className="text-sm font-semibold text-teal-300 bg-slate-700 px-2 py-0.5 rounded-full">{proficiency}</span>
                        </li>
                        ))}
                    </ul>
                </div>

                 {/* Tech Stack */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-3">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                        {analysis.techStack.map(tech => (
                        <span key={tech} className="bg-slate-700 text-teal-300 text-xs font-medium px-2.5 py-1 rounded-full">
                          {tech === 'javascript' ? 'JavaScript' :
                           tech === 'typescript' ? 'TypeScript' :
                           tech === 'nodejs' || tech === 'node.js' ? 'Node.js' :
                           tech === 'reactjs' || tech === 'react' ? 'React' :
                           tech === 'python' ? 'Python' :
                           tech.charAt(0).toUpperCase() + tech.slice(1)}
                        </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
                {/* Ratings */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">Ratings</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div className="bg-slate-800/30 p-4 rounded-lg border border-cyan-800/50 flex flex-col items-center">
                            <h4 className="font-semibold mb-2">Code Quality</h4>
                            <RatingCircle rating={analysis.codeQuality?.rating || 0} />
                            <div className="text-xs text-gray-400 mt-2 text-center leading-relaxed">
                              {formatText(analysis.codeQuality.justification)}
                            </div>
                        </div>
                        <div className="bg-slate-800/30 p-4 rounded-lg border border-cyan-800/50 flex flex-col items-center">
                            <h4 className="font-semibold mb-2">Project Complexity</h4>
                            <RatingCircle rating={analysis.projectComplexity?.rating || 0} />
                            <div className="text-xs text-gray-400 mt-2 text-center leading-relaxed">
                              {formatText(analysis.projectComplexity.justification)}
                            </div>
                        </div>
                        <div className="bg-slate-800/30 p-4 rounded-lg border border-cyan-800/50 flex flex-col items-center">
                            <h4 className="font-semibold mb-2">Documentation</h4>
                            <RatingCircle rating={analysis.documentation?.rating || 0} />
                            <div className="text-xs text-gray-400 mt-2 text-center leading-relaxed">
                              {formatText(analysis.documentation.justification)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Top Repositories */}
        <div>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-400 mb-3">Top Repositories</h3>
            <div className="space-y-4">
                {analysis.topRepositories.map(repo => (
                <a 
                    href={repo.url || (githubUsername ? `https://github.com/${githubUsername}/${repo.name}` : `https://github.com/search?q=${encodeURIComponent(repo.name)}&type=repositories`)} 
                    key={repo.name} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block bg-slate-800/30 p-4 rounded-lg border border-cyan-800/50 hover:border-cyan-500 transition-colors"
                >
                    <h4 className="font-bold text-cyan-400">{repo.name}</h4>
                    <div className="text-sm text-gray-400 leading-relaxed">
                      {formatText(repo.justification)}
                    </div>
                </a>
                ))}
            </div>
        </div>
    </div>
  );
};

export default AnalysisDisplay;
