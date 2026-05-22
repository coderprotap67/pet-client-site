'use client';

import { useState } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    image: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { setUser } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();

    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.');
    }

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passRegex.test(formData.password)) {
      return setError(
        'Password must be 6+ chars, include uppercase & lowercase letter.'
      );
    }

    try {
      setLoading(true);

      const res = await api.post('/register', {
        name: formData.name,
        email: formData.email,
        image: formData.image,
        password: formData.password,
      });

      if (res.data.success) {
        localStorage.setItem('token', res.data.token);

        setUser(res.data.user);

        window.location.href = '/';
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="max-w-md mx-auto my-12 p-8 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-3xl shadow-xs">

      <h2 className="text-3xl font-extrabold mb-6 text-center">
        Create Account 🐕
      </h2>

      {error && (
        <p className="text-red-500 text-sm mb-4 text-center bg-red-50 dark:bg-red-950/30 p-2 rounded-lg">
          {error}
        </p>
      )}

      <form onSubmit={handleRegister} className="space-y-4">

        <input
          required
          placeholder="Full Name"
          type="text"
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="w-full p-2.5 border rounded-lg bg-transparent"
        />

        <input
          required
          placeholder="Email"
          type="email"
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          className="w-full p-2.5 border rounded-lg bg-transparent"
        />

        <input
          placeholder="Photo URL (optional)"
          type="url"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.value })
          }
          className="w-full p-2.5 border rounded-lg bg-transparent"
        />

        <input
          required
          placeholder="Password"
          type="password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full p-2.5 border rounded-lg bg-transparent"
        />

        <input
          required
          placeholder="Confirm Password"
          type="password"
          onChange={(e) =>
            setFormData({
              ...formData,
              confirmPassword: e.target.value,
            })
          }
          className="w-full p-2.5 border rounded-lg bg-transparent"
        />

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-amber-500 text-white py-3 rounded-xl font-bold"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <div className="my-6 text-center text-gray-400">
        OR
      </div>

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 border py-3 rounded-xl font-bold"
      >
        <FcGoogle className="text-2xl" />

        {loading ? 'Redirecting...' : 'Continue with Google'}
      </button>

      <p className="text-sm text-center mt-6">
        Already have account?{' '}

        <Link
          href="/login"
          className="text-amber-500 font-semibold"
        >
          Login
        </Link>
      </p>
    </div>
  );
}