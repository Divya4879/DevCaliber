import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { User, UserRole } from '../types';

export interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => void;
  setRole: (role: UserRole) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user: auth0User, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
  const [role, setRoleState] = useState<UserRole | null>(null);

  const getDemoUserName = (email: string | null): string | null => {
    if (!email) return null;
    const lowerEmail = email.toLowerCase();
    if (lowerEmail === 'admin@testcredential.com') return 'Welcome Admin🫡';
    if (lowerEmail === 'recruiter@testcredential.com') return 'Welcome Miss/Mr Recruiter';
    if (lowerEmail === 'candidate@testcredential.com') return 'Welcome Miss/Mr Candidate👩‍💻🧑‍💻';
    return null;
  };

  const user = auth0User ? {
    uid: auth0User.sub!,
    email: auth0User.email!,
    name: getDemoUserName(auth0User.email) || auth0User.name || auth0User.nickname || auth0User.email!.split('@')[0],
    // For GitHub users, use their GitHub username; for demo candidate, use 'democandidate'
    ...(auth0User.sub?.includes('github') && { githubUsername: auth0User.nickname || auth0User.preferred_username }),
    ...(auth0User.email === 'candidate@testcredential.com' && { githubUsername: 'democandidate' })
  } : null;

  useEffect(() => {
    if (isAuthenticated && auth0User) {
      console.log('Auth0 User Object:', auth0User);
      
      // Demo accounts get immediate role assignment
      const email = auth0User.email?.toLowerCase();
      let userRole: UserRole | undefined;
      
      if (email === 'admin@testcredential.com') {
        userRole = UserRole.ADMIN;
        setRoleState(userRole);
        return;
      } else if (email === 'recruiter@testcredential.com') {
        userRole = UserRole.RECRUITER;
        setRoleState(userRole);
        return;
      } else if (email === 'candidate@testcredential.com') {
        userRole = UserRole.CANDIDATE;
        setRoleState(userRole);
        return;
      }
      
      // For real GitHub users - automatically assign CANDIDATE role
      if (auth0User.sub?.includes('github')) {
        console.log('GitHub user detected, assigning CANDIDATE role');
        setRoleState(UserRole.CANDIDATE);
        localStorage.setItem(`role_${auth0User.sub}`, UserRole.CANDIDATE);
        return;
      }
      
      // For other real users, check localStorage for existing role
      const storedRole = localStorage.getItem(`role_${auth0User.sub}`);
      const emailBasedRole = localStorage.getItem(`user_role_${auth0User.email}`);
      
      console.log('Stored role for user:', storedRole);
      console.log('Email-based role:', emailBasedRole);
      
      // Check email-based role first (for recruiter approvals)
      if (emailBasedRole && Object.values(UserRole).includes(emailBasedRole as UserRole)) {
        setRoleState(emailBasedRole as UserRole);
        // Migrate to sub-based storage
        localStorage.setItem(`role_${auth0User.sub}`, emailBasedRole);
        localStorage.removeItem(`user_role_${auth0User.email}`);
      } else if (storedRole && Object.values(UserRole).includes(storedRole as UserRole)) {
        setRoleState(storedRole as UserRole);
      } else {
        // New user - no role stored, will show role selection
        setRoleState(null);
      }
    } else {
      setRoleState(null);
    }
  }, [isAuthenticated, auth0User]);

  const signIn = async (): Promise<void> => {
    await loginWithRedirect();
  };

  const signOut = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    setRoleState(null);
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (user) {
      // Save role to localStorage for non-demo users
      const email = user.email?.toLowerCase();
      const isDemoAccount = email === 'admin@testcredential.com' || 
                           email === 'recruiter@testcredential.com' || 
                           email === 'candidate@testcredential.com';
      
      if (!isDemoAccount) {
        localStorage.setItem(`role_${user.uid}`, newRole);
        console.log('Role saved to localStorage:', newRole);
      }
    }
  };

  const value = { 
    user, 
    role, 
    loading: isLoading, 
    signIn, 
    signOut, 
    setRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
