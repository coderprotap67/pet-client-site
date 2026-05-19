'use client';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function PetCard({ pet }) {
  const { wishlist, toggleWishlist } = useAuth();
  const isWished = wishlist.includes(pet._id);

  return (
    <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl overflow-hidden shadow-xs relative flex flex-col justify-between">
      <button onClick={() => toggleWishlist(pet._id)} className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs rounded-full shadow-xs text-xl">
        {isWished ? '❤️' : '🤍'}
      </button>
      <div>
        <div className="h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
          <img src={pet.imageUrl} alt={pet.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-5">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{pet.name}</h3>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">{pet.species}</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Breed: {pet.breed} • Age: {pet.age} Yrs</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">📍 {pet.location}</p>
        </div>
      </div>
      <div className="p-5 pt-0">
        <Link href={`/pets/${pet._id}`}>
          <button className="w-full bg-slate-100 dark:bg-slate-700 hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-white text-slate-800 dark:text-slate-200 font-bold py-2 rounded-xl transition text-sm">
            View Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
}