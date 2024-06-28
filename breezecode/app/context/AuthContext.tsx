"use client"
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
  error: string | null; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [ accessToken, setAccessToken] = useState<string | null>(null);

    const [refreshToken, setRefreshToken] = useState<string | null>(null);

    const [error, setError] = useState<string | null>(null);

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
          const data = await response.json();
          setAccessToken(data.accessToken);
          setRefreshToken(data.refreshToken);
          setError(null); 
        } catch (error) {
          setError('An unexpected error occurred');
        }
      };

    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        setError(null);
    };

    const refreshAccessToken = async () => {
        try {
          const response = await fetch('/api/refresh-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
          });
          if (!response.ok) {
            logout();
            return;
          }
          const data = await response.json();
          setAccessToken(data.accessToken);
        } catch (error) {
          logout();
        }
      };

    return(
        <AuthContext.Provider value={{ accessToken, refreshToken, login, logout, refreshAccessToken, error }}  >
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