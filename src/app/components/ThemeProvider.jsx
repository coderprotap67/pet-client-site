'use client';
import { AuthProvider } from '../context/AuthContext';

export default function ThemeProvider({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}