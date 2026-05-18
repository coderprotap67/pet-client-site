'use client';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { user, theme, toggleTheme, setUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    // Call backend endpoint cookie clear
    setUser(null);
  };

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl">🐾</span>
          <span className="font-bold text-xl text-amber-600 dark:text-amber-500 tracking-tight">PawsHome</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-slate-600 dark:text-slate-300 hover:text-amber-500">Home</Link>
          <Link href="/pets" className="text-slate-600 dark:text-slate-300 hover:text-amber-500">All Pets</Link>
          {user && (
            <>
              <Link href="/dashboard/my-requests" className="text-slate-600 dark:text-slate-300 hover:text-amber-500">My Requests</Link>
              <Link href="/dashboard/add-pet" className="text-slate-600 dark:text-slate-300 hover:text-amber-500">Add Pet</Link>
            </>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-lg">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {user ? (
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="w-10 h-10 rounded-full border-2 border-amber-500 overflow-hidden">
                <img src={user.photoUrl || '/assets/placeholder.jpg'} alt="Profile" className="w-full h-full object-cover" />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-2"
                  >
                    <Link href="/dashboard/my-listings" className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">Dashboard</Link>
                    <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-red-500 hover:bg-slate-100 dark:hover:bg-slate-700">Logout</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href="/login" className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-full transition font-medium">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}