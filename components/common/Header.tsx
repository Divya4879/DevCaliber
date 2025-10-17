import React from 'react';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
    onSignInClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSignInClick }) => {
    const { user, signOut } = useAuth();

    return (
        <header className="bg-slate-900/70 backdrop-blur-sm sticky top-0 z-50 border-b border-cyan-800/50 no-print">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-400 font-poppins">
                    DevCaliber
                </div>
                <nav>
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-300 hidden sm:block">{user.name || user.email}</span>
                            <button
                                onClick={signOut}
                                className="px-4 py-2 text-sm font-medium text-white bg-slate-700 rounded-md hover:bg-slate-800 transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={onSignInClick}
                            className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-md hover:bg-cyan-700 transition-colors"
                        >
                            Sign In
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
