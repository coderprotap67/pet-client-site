'use client';
import { useState } from 'react';
import api from '../../utils/api'; 
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';
import { createAuthClient } from "better-auth/react";
import { FcGoogle } from 'react-icons/fc'; 

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL 
});

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', photo: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.');
    }
    
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passRegex.test(formData.password)) {
      return setError('Password must be 6+ chars, include one uppercase and one lowercase letter.');
    }

    setLoading(true);
    setError('');
    
    try {
      const res = await api.post('/register', formData); 
      
      if (res.data.success) {
        // --- এই অংশটুকু যোগ করা হয়েছে ---
        // টোকেনটি localStorage-এ সেভ করুন যাতে ব্রাউজার রিফ্রেশ হলেও লগইন থাকে
        localStorage.setItem("token", res.data.token); 
        
        // কন্টেক্সটে ইউজার ডাটা সেট করুন
        setUser(res.data.user);
        
        // হোম পেজে নিয়ে যান
        window.location.href = '/';
        // --------------------------------
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // ... (বাকি কোড আগের মতোই থাকবে)
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", 
      });
    } catch (err) {
      setError('Google Authentication aborted.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... আপনার আগের রিটার্ন কোডটি এখানে বসিয়ে দিন
    <div className="max-w-md mx-auto my-12 p-8 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-3xl shadow-xs">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-slate-900 dark:text-white">Create Account 🐕</h2>
      
      {error && <p className="text-red-500 text-sm mb-4 text-center bg-red-50 dark:bg-red-950/30 p-2 rounded-lg">{error}</p>}
      
      <form onSubmit={handleRegister} className="space-y-4">
        <div><label className="text-sm font-bold">Full Name</label><input required type="text" onChange={(e)=>setFormData({...formData, name: e.target.value})} className="w-full p-2.5 border rounded-lg bg-transparent mt-1"/></div>
        <div><label className="text-sm font-bold">Email Address</label><input required type="email" onChange={(e)=>setFormData({...formData, email: e.target.value})} className="w-full p-2.5 border rounded-lg bg-transparent mt-1"/></div>
        <div><label className="text-sm font-bold">Photo URL Profile (Optional)</label><input type="url" onChange={(e)=>setFormData({...formData, photo: e.target.value})} className="w-full p-2.5 border rounded-lg bg-transparent mt-1"/></div>
        <div><label className="text-sm font-bold">Password</label><input required type="password" onChange={(e)=>setFormData({...formData, password: e.target.value})} className="w-full p-2.5 border rounded-lg bg-transparent mt-1"/></div>
        <div><label className="text-sm font-bold">Confirm Password</label><input required type="password" onChange={(e)=>setFormData({...formData, confirmPassword: e.target.value})} className="w-full p-2.5 border rounded-lg bg-transparent mt-1"/></div>
        
        <button disabled={loading} type="submit" className="w-full bg-amber-500 text-white py-3 rounded-xl font-bold transition hover:bg-amber-600 disabled:bg-gray-400">
            {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <div className="relative my-6 text-center">
        <hr className="border-slate-200 dark:border-slate-700" />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 px-3 text-xs text-slate-400 font-bold uppercase tracking-wider">Or continue with</span>
      </div>
      <button disabled={loading} onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 border dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 py-3 rounded-xl font-bold transition disabled:opacity-50">
        <FcGoogle className="text-2xl" /> {loading ? "Redirecting..." : "Sign in with Google"}
      </button>
      <p className="text-sm text-center text-slate-500 dark:text-slate-400 mt-6">Existing user? <Link href="/login" className="text-amber-500 font-semibold underline">Login instead</Link></p>
    </div>
  );
}