'use client';
import { useTheme } from './MyThemeProvider';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSun, HiMoon } from 'react-icons/hi';
import { MdPets } from 'react-icons/md'; 
import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL
});

export default function Navbar() {
  const { user, setUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await authClient.signOut(); 
      setUser(null);
      window.location.href = '/';
    } catch (err) {
      console.error("Sign out process error:", err);
    }
  };

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <motion.div
            whileHover={{ rotate: [0, -15, 15, 0] }}
            transition={{ duration: 0.4 }}
            className="text-amber-600 dark:text-amber-500 text-2xl"
          >
            <MdPets />
          </motion.div>
          <span className="font-bold text-xl text-amber-600 dark:text-amber-500 tracking-tight transition-colors">
            PawsHome
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors font-medium text-sm">Home</Link>
          <Link href="/pets" className="text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors font-medium text-sm">All Pets</Link>
          {user && (
            <>
              <Link href="/dashboard/my-requests" className="text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors font-medium text-sm">My Requests</Link>
              <Link href="/dashboard/add-pet" className="text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors font-medium text-sm">Add Pet</Link>
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
                    {mounted && (
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-400 transition-all text-xl"
              title={theme === 'dark' ? "Switch to Day Mode" : "Switch to Dark Mode"}
            >
              {theme === 'dark' ? <HiSun /> : <HiMoon />}
            </button>
          )}

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)} 
                className="w-10 h-10 rounded-full border-2 border-amber-500 overflow-hidden focus:outline-none transition-transform active:scale-95 block"
              >
                <img src={user.image || user.photoUrl || '/assets/placeholder.jpg'} alt="Profile" className="w-full h-full object-cover" />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-2 z-50"
                  >
                    <Link 
                      href="/dashboard/my-listings" 
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button 
                      onClick={() => { setDropdownOpen(false); handleLogout(); }} 
                      className="w-full text-left block px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border-t border-slate-100 dark:border-slate-700/50"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href="/login" className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-full transition-all duration-200 font-bold text-sm shadow-xs active:scale-95">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}