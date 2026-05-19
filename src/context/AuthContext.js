'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);
axios.defaults.withCredentials = true; 
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check local auth state
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/auth/me`);
        if (res.data.success) setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();

    // System theme setup
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.documentElement.classList.toggle('dark', storedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const targetTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(targetTheme);
    localStorage.setItem('theme', targetTheme);
    document.documentElement.classList.toggle('dark', targetTheme === 'dark');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, theme, toggleTheme }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);