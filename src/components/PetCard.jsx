'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { HiLocationMarker } from 'react-icons/hi';

export default function PetCard({ pet }) {
  const { wishlist, toggleWishlist } = useAuth();

  const isWished = wishlist?.includes(pet._id) || false;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl overflow-hidden shadow-xs relative flex flex-col justify-between transition-colors duration-300"
    >
      <button
        onClick={() => toggleWishlist && toggleWishlist(pet._id)}
        className="absolute top-4 right-4 z-10 p-2.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs rounded-full shadow-xs text-xl transition-all active:scale-90"
        title={isWished ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        {isWished ? (
          <IoHeart className="text-red-500 animate-heartBeat" size={22} />
        ) : (
          <IoHeartOutline
            className="text-slate-600 dark:text-slate-400 hover:text-red-500"
            size={22}
          />
        )}
      </button>

      <div>
        <div className="h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
          <img
            src={pet?.image || '/assets/placeholder.jpg'}
            alt={pet?.petName || 'Pet'}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="p-5">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              {pet?.petName}
            </h3>

            <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 uppercase tracking-wider">
              {pet?.species}
            </span>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 font-medium">
            Breed: {pet?.breed} • Age: {pet?.age}{' '}
            {pet?.age > 1 ? 'Yrs' : 'Yr'}
          </p>

          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <HiLocationMarker className="text-amber-500 text-base flex-shrink-0" />
            <span>{pet?.location}</span>
          </p>
        </div>
      </div>

      <div className="p-5 pt-0">
        <Link href={`/pets/${pet?._id}`}>
          <button className="w-full bg-slate-100 dark:bg-slate-700 hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-white text-slate-800 dark:text-slate-200 font-bold py-2.5 rounded-xl transition-all text-sm active:scale-[0.99]">
            View Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
}