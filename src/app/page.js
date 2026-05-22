'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import PetCard from '../components/PetCard';
import { useAuth } from '../context/AuthContext'; 

export default function HomePage() {
  const [featuredPets, setFeaturedPets] = useState([]);
  const { user } = useAuth(); 
  useEffect(() => {
    api.get('/pets').then((res) => {
      if (res.data.success) setFeaturedPets(res.data.data.slice(0, 6));
    });
  }, []);
  return (
    <div className="bg-white dark:bg-slate-900 transition-colors duration-300">
      <section className="relative overflow-hidden bg-amber-50/50 dark:bg-slate-950 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Finding Matches <br /><span className="text-amber-500">Every Heartbeat</span> Count
            </h1>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
              Bring home absolute joy. Browse verified listings near you and change an innocent animal's destiny today.
            </p>
            <div className="mt-10">
              <Link href="/pets">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-amber-500 hover:bg-amber-600 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg shadow-amber-500/20">
                  Adopt Now 🐾
                </motion.button>
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1000" alt="Happy dog looking up" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Featured Companions</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-10">Meet some lovable friends searching for a warm family.</p>
        
        {user ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPets.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>
        ) : (
<div className="flex flex-col items-center justify-center p-12 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 text-center">
  <span className="text-5xl mb-4">🔒</span>
  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
    Login Required to View Featured Companions
  </h3>
  <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
    To protect our community and view full pet profiles, photos, and adoption details, please sign in or create an account.
  </p>
  <Link href="/login">
    <motion.button 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }} 
      className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md"
    >
      Login / Sign Up 🐾
    </motion.button>
  </Link>
</div>
        )}
      </section>

      <hr className="border-slate-200 dark:border-slate-800" />
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">Why Adopt From Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl">
            <div className="text-4xl mb-4">❤️</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Save a Precious Life</h3>
            <p className="text-slate-600 dark:text-slate-400">Give a shelter animal a secondary chance at living happily inside a healthy, loving home framework.</p>
          </div>
          <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl">
            <div className="text-4xl mb-4">🩺</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Fully Vet-Checked</h3>
            <p className="text-slate-600 dark:text-slate-400">All available animals undergo strict processing parameters, health checks, and vaccination cycles.</p>
          </div>
          <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Community Driven</h3>
            <p className="text-slate-600 dark:text-slate-400">We assist users at every checkpoint during post-adoption settlement intervals.</p>
          </div>
        </div>
      </section>
      <section className="bg-slate-50 dark:bg-slate-950 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">Happy Tails (Success Stories)</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-md flex items-center space-x-6">
              <img className="w-24 h-24 rounded-full object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=250" alt="User with pet" />
              <div>
                <p className="text-slate-600 dark:text-slate-400 italic">"Finding Rocky on PawsHome was seamless. The workflow execution map matched us accurately with an adorable, energetic puppy!"</p>
                <h4 className="mt-4 font-bold text-slate-900 dark:text-white">- Sarah & Rocky</h4>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-md flex items-center space-x-6">
              <img className="w-24 h-24 rounded-full object-cover" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=250" alt="User with cat" />
              <div>
                <p className="text-slate-600 dark:text-slate-400 italic">"Luna was rescue-sheltered when I applied. The validation logic framework provided direct, trustworthy contact pipelines to the owner."</p>
                <h4 className="mt-4 font-bold text-slate-900 dark:text-white">- James & Luna</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">Essential Educational Snippets</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <div className="p-6">
              <span className="text-xs font-bold uppercase text-amber-500 tracking-wider">Nutrition</span>
              <h4 className="text-xl font-bold mt-2 text-slate-900 dark:text-white">Optimal Balanced Diets for Summer</h4>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Keep pets hydrated. Maintain continuous water replenishment pipelines during extreme heat indices...</p>
            </div>
          </div>
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <div className="p-6">
              <span className="text-xs font-bold uppercase text-amber-500 tracking-wider">Behavior</span>
              <h4 className="text-xl font-bold mt-2 text-slate-900 dark:text-white">Understanding Tail Wagging Signs</h4>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Tail movements reflect diverse emotional structures. Learn to identify stress triggers vs joyful signals...</p>
            </div>
          </div>
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <div className="p-6">
              <span className="text-xs font-bold uppercase text-amber-500 tracking-wider">Health</span>
              <h4 className="text-xl font-bold mt-2 text-slate-900 dark:text-white">Vaccination Schedules Decoded</h4>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Tracking basic rabies and multi-booster routines prevents chronic veterinary financial outlays...</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-amber-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">How the Adoption Process Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="w-16 h-16 bg-white text-amber-600 font-bold text-2xl flex items-center justify-center rounded-full mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Find Your Match</h3>
              <p className="text-amber-50 text-sm">Filter using customizable lookup engines targeting verified pet assets.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white text-amber-600 font-bold text-2xl flex items-center justify-center rounded-full mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Submit Request</h3>
              <p className="text-amber-50 text-sm">Provide pickup timetables alongside intentional motivational introductory messages.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white text-amber-600 font-bold text-2xl flex items-center justify-center rounded-full mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Owner Review</h3>
              <p className="text-amber-50 text-sm">The creator validates claims applying structural single-approval rules.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white text-amber-600 font-bold text-2xl flex items-center justify-center rounded-full mx-auto mb-4">4</div>
              <h3 className="text-xl font-semibold mb-2">Take Home</h3>
              <p className="text-amber-50 text-sm">Finalize logistical processes and receive your brand new family member.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center">Upcoming Community Initiatives</h2>
        <div className="bg-slate-100 dark:bg-slate-800 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-bold">COMMUNITY</span>
            <h3 className="text-2xl font-bold mt-2 text-slate-900 dark:text-white">Annual Paws Adoption Camp 2026</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Join us live in downtown parsing zones to experience face-to-face pet matching processes.</p>
            <p className="mt-4 text-sm font-semibold text-amber-500">📅 May 30, 2026 • 10:00 AM - 4:00 PM</p>
          </div>
          <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl font-bold">View Location Map</button>
        </div>
      </section>
    </div>
  );
}