import React from 'react';

interface LandingPageProps {
    onGetStarted: () => void;
}

const FeatureCard: React.FC<{ icon: string; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-slate-800/30 border border-cyan-800/50 rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
        <div className="text-5xl text-cyan-400 mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{children}</p>
    </div>
);


const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="animate-fade-in">
        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-4 -mt-16">
            <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-400 mb-4 font-poppins">
                DevCaliber
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-200 max-w-4xl mx-auto mb-6">
                AI-Powered Technical Talent Intelligence Platform
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                Revolutionizing technical hiring through advanced AI analysis. Developers showcase verified skills through GitHub analysis. 
                Recruiters access pre-vetted talent with quantified technical capabilities. Eliminate hiring guesswork.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                    onClick={onGetStarted}
                    className="px-8 py-4 text-lg font-bold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20"
                >
                    Get Started
                </button>
            </div>
        </section>

        {/* Features Section */}
        <section className="min-h-screen bg-slate-900/50 flex items-center py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-4">
                        Intelligent Talent Matching
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Bridge the gap between exceptional developers and forward-thinking companies through 
                        AI-driven skill verification and intelligent talent discovery.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
                    <FeatureCard icon="🧠" title="Advanced AI Analysis">
                        Deep learning algorithms analyze code architecture, complexity patterns, best practices, and technical depth across repositories. 
                        Generate comprehensive skill profiles with confidence scores and growth trajectories.
                    </FeatureCard>
                    <FeatureCard icon="🏆" title="Verified Skill Credentials">
                        Issue blockchain-verifiable digital badges with detailed competency breakdowns. Showcase proven expertise in specific technologies, 
                        frameworks, and methodologies with quantified proficiency levels.
                    </FeatureCard>
                    <FeatureCard icon="🎯" title="Precision Talent Matching">
                        Connect verified developers with hiring managers through intelligent matching algorithms. Filter by technical stack, 
                        experience level, project complexity, and cultural fit indicators.
                    </FeatureCard>
                </div>

                {/* Value Propositions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 p-8 rounded-2xl border border-cyan-800/30">
                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-3xl">👨‍💻</span>
                            For Developers
                        </h3>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-start gap-3">
                                <span className="text-green-400 mt-1">✓</span>
                                <span>Transform GitHub activity into professional credentials</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-400 mt-1">✓</span>
                                <span>Receive detailed skill assessments and improvement recommendations</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-400 mt-1">✓</span>
                                <span>Access exclusive opportunities from verified companies</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-400 mt-1">✓</span>
                                <span>Build verifiable professional reputation in tech community</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-8 rounded-2xl border border-purple-800/30">
                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-3xl">🏢</span>
                            For Hiring Teams
                        </h3>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-start gap-3">
                                <span className="text-purple-400 mt-1">✓</span>
                                <span>Access pre-screened talent pool with verified technical skills</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-purple-400 mt-1">✓</span>
                                <span>Reduce time-to-hire by 60% with AI-powered candidate matching</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-purple-400 mt-1">✓</span>
                                <span>Make data-driven hiring decisions with comprehensive skill reports</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-purple-400 mt-1">✓</span>
                                <span>Integrate with existing ATS and HR workflows seamlessly</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
};

export default LandingPage;
