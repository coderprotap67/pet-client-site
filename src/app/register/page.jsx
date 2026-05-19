'use client';
import { useState } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', photoUrl: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const { setUser } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return setError('Passwords do not match value properties.');
    try {
      const res = await api.post('/auth/register', formData);
      if (res.data.success) {
        setUser(res.data.user);
        window.location.href = '/';
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration aborted.');
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-8 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-3xl shadow-xs">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-slate-900 dark:text-white">Create Account 🐕</h2>
      {error && <p className="text-red-500 text-sm mb-4 text-center bg-red-50 dark:bg-red-950/30 p-2 rounded-lg">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
        <div><label className="text-sm font-bold">Full Identity Name</label><input required type="text" onChange={(e)=>setFormData({...formData, name: e.target.value})} className="w-full p-2.5 border rounded-lg bg-transparent mt-1"/></div>
        <div><label className="text-sm font-bold">Email Address</label><input required type="email" onChange={(e)=>setFormData({...formData, email: e.target.value})} className="w-full p-2.5 border rounded-lg bg-transparent mt-1"/></div>
        <div><label className="text-sm font-bold">Photo URL Profile (Optional)</label><input type="url" onChange={(e)=>setFormData({...formData, photoUrl: e.target.value})} className="w-full p-2.5 border rounded-lg bg-transparent mt-1"/></div>
        <div><label className="text-sm font-bold">Password (min 6 characters, 1 upper, 1 lower)</label><input required type="password" onChange={(e)=>setFormData({...formData, password: e.target.value})} className="w-full p-2.5 border rounded-lg bg-transparent mt-1"/></div>
        <div><label className="text-sm font-bold">Confirm Secret Password</label><input required type="password" onChange={(e)=>setFormData({...formData, confirmPassword: e.target.value})} className="w-full p-2.5 border rounded-lg bg-transparent mt-1"/></div>
        <button type="submit" className="w-full bg-amber-500 text-white py-3 rounded-xl font-bold transition hover:bg-amber-600">Register Identity Matrix</button>
      </form>
      <p className="text-sm text-center text-slate-500 dark:text-slate-400 mt-6">Existing user? <Link href="/login" className="text-amber-500 font-semibold underline">Login instead</Link></p>
    </div>
  );
} 