"use client"
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import cookie from 'js-cookie';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
  error: string | null; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
      const accessToken = cookie.get('accessToken');
      if (accessToken) {
        setIsAuthenticated(true);
      }
      const interval = setInterval(refreshAccessToken, 14*60*1000);
      return () => clearInterval(interval);
    }, []);

    const login = async (email: string, password: string) => {
        try {
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.message);
            return;
          }
          setIsAuthenticated(true);
          setError(null);
          router.push('/'); 
        } catch (error) {
          setError('An unexpected error occurred');
        }
      };

    const logout = () => {
      cookie.remove('accessToken');
      cookie.remove('refreshToken');
      setIsAuthenticated(false);
      setError(null);
      router.push('/login');
    };

    const refreshAccessToken = async () => {
        try {
          const response = await fetch('/api/refresh-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          });

          if (!response.ok) {
            logout();
            return;
          }
        } catch (error) {
          logout();
        }
      };

    return(
        <AuthContext.Provider value={{ isAuthenticated, login, logout, refreshAccessToken, error }}  >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}