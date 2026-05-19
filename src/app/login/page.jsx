'use client';
import { useState } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser, fetchWishlist } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        setUser(res.data.user);
        await fetchWishlist();
        window.location.href = '/';
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login routine failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto my-20 p-8 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-3xl shadow-xs">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-slate-900 dark:text-white">Welcome Back 🐾</h2>
      {error && <p className="text-red-500 text-sm mb-4 text-center bg-red-50 dark:bg-red-950/30 p-2 rounded-lg">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div><label className="text-sm font-bold">Email Address</label><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2.5 border rounded-lg bg-transparent mt-1" /></div>
        <div><label className="text-sm font-bold">Password</label><input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2.5 border rounded-lg bg-transparent mt-1" /></div>
        <button type="submit" className="w-full bg-amber-500 text-white py-3 rounded-xl font-bold transition hover:bg-amber-600">Secure Sign In</button>
      </form>
      <p className="text-sm text-center text-slate-500 dark:text-slate-400 mt-6">Don't have an account? <Link href="/register" className="text-amber-500 font-semibold underline">Register here</Link></p>
    </div>
  );
}