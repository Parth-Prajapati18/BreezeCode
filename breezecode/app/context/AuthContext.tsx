"use client"
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
  error: string | null; 
  user: User | null;
  loading: boolean;
}

interface User {
  email: string;
  role: string;
  accessToken: string;
  name: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
      const checkAuthStatus = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          setIsAuthenticated(true);
          setUser((prevUser) => prevUser ? { ...prevUser, accessToken } : null);
        }
        setLoading(false);
      };
      checkAuthStatus();
      const interval = setInterval(refreshAccessToken, 14*60*1000);
      return () => clearInterval(interval);
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.message);
            setLoading(false);
            return;
          }

          const data = await response.json();
          setUser({
            email: data.user.email,
            role: data.user.role,
            accessToken: data.user.accessToken,
            name: data.user.name,
          });
          localStorage.setItem('accessToken', data.user.accessToken);
          localStorage.setItem('refreshToken', data.user.refreshToken);
          setIsAuthenticated(true);
          setError(null);
          setLoading(false);
          router.push('/'); 
        } catch (error) {
          setError('An unexpected error occurred');
          setLoading(false); 
        }
      };

    const logout = () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('isAuthenticated');
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
      router.push('/login');
    };

    const refreshAccessToken = async () => {
        try {
          const response = await fetch('/api/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken : localStorage.getItem('refreshToken') }),
          });

          if (!response.ok) {
            logout();
            return;
          }

          const data = await response.json();
          const accessToken = data.accessToken;
          setUser((prevUser) => prevUser ? { ...prevUser, accessToken } : null);
          localStorage.setItem('accessToken', accessToken);

        } catch (error) {
          logout();
        }
      };

    return(
        <AuthContext.Provider value={{ isAuthenticated, login, logout, refreshAccessToken, error, user, loading }}  >
            {loading ? <div>Loading...</div> : children}
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
