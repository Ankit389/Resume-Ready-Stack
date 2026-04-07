import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '../lib/api';

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const res = await authAPI.me();
          setUser(res.data.data.user);
          setToken(storedToken);
        } catch {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setToken(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await authAPI.login(email, password);
    const { user: u, token: t } = res.data.data;
    setUser(u);
    setToken(t);
    localStorage.setItem('token', t);
    localStorage.setItem('user', JSON.stringify(u));
  };

  const signup = async (name: string, email: string, password: string, phone?: string) => {
    const res = await authAPI.signup(name, email, password, phone);
    const { user: u, token: t } = res.data.data;
    setUser(u);
    setToken(t);
    localStorage.setItem('token', t);
    localStorage.setItem('user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
