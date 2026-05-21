'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { HiLocationMarker } from 'react-icons/hi';

export default function PetCard({ pet }) {

  console.log("PET ID =", pet?._id);

  const { wishlist, toggleWishlist } = useAuth();

  const isWished = wishlist?.includes(pet?._id);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-slate-800 border rounded-2xl overflow-hidden shadow-xs relative flex flex-col justify-between"
    >

      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist?.(pet?._id)}
        className="absolute top-4 right-4 z-10 p-2.5 bg-white/80 dark:bg-slate-900/80 rounded-full"
      >
        {isWished ? (
          <IoHeart className="text-red-500" size={22} />
        ) : (
          <IoHeartOutline className="text-slate-500" size={22} />
        )}
      </button>

      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={pet?.image || '/assets/placeholder.jpg'}
          alt={pet?.petName || 'Pet'}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="text-xl font-bold">{pet?.petName}</h3>

        <p className="text-sm">
          Breed: {pet?.breed} • Age: {pet?.age}
        </p>

        <p className="flex items-center gap-1 text-sm">
          <HiLocationMarker />
          {pet?.location}
        </p>
      </div>

      {/* DETAILS BUTTON */}
      <div className="p-5 pt-0">

        {pet?._id ? (
<Link href={`/pets/${String(pet?._id).trim()}`}>
            <button className="w-full bg-amber-500 text-white py-2 rounded-xl">
              View Details
            </button>
          </Link>
        ) : (
          <button disabled className="w-full bg-gray-300 py-2 rounded-xl">
            No Data
          </button>
        )}

      </div>

    </motion.div>
  );
}