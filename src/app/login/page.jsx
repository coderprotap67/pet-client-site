'use client';
import { useState } from 'react';
import { createAuthClient } from "better-auth/react";
import Link from 'next/link';

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL
});

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await authClient.signIn.email({ email, password });
      if (error) return setError(error.message);
      window.location.href = '/';
    } catch (err) {
      setError('Login routine failed.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", 
      });
    } catch (err) {
      setError('Google Authentication aborted.');
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

      <div className="relative my-6 text-center">
        <hr className="border-slate-200 dark:border-slate-700" />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 px-3 text-xs text-slate-400 font-bold uppercase tracking-wider">Or continue with</span>
      </div>

      <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 border dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 py-3 rounded-xl font-bold transition">
        <img src="https://docs.better-auth.com/icons/google.svg" alt="Google" className="w-5 h-5" />
        Sign in with Google
      </button>

      <p className="text-sm text-center text-slate-500 dark:text-slate-400 mt-6">Don't have an account? <Link href="/register" className="text-amber-500 font-semibold underline">Register here</Link></p>
    </div>
  );
}