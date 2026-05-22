'use client';

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        window.location.href = '/pets';
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  // ---------------- GOOGLE LOGIN (FIXED) ----------------
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="max-w-md mx-auto my-20 p-8 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-3xl shadow-xs">

      <h2 className="text-3xl font-extrabold mb-6 text-center">
        Welcome Back 🐾
      </h2>

      {error && (
        <p className="text-red-500 text-sm mb-4 text-center bg-red-50 dark:bg-red-950/30 p-2 rounded-lg">
          {error}
        </p>
      )}

      <form onSubmit={handleLogin} className="space-y-4">

        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2.5 border rounded-lg bg-transparent"
        />

        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2.5 border rounded-lg bg-transparent"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-500 text-white py-3 rounded-xl font-bold"
        >
          {loading ? 'Signing in...' : 'Secure Sign In'}
        </button>
      </form>

      <div className="my-6 text-center text-gray-400">OR</div>

      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 border py-3 rounded-xl font-bold"
      >
        <FcGoogle className="text-2xl" />
        Sign in with Google
      </button>

      <p className="text-sm text-center mt-6">
        Don't have an account?{' '}
        <Link href="/register" className="text-amber-500 font-semibold underline">
          Register here
        </Link>
      </p>
    </div>
  );
}