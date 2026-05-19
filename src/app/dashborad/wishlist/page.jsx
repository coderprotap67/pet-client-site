'use client';
import { useState, useEffect } from 'react';
import api from '../../../utils/api';
import PetCard from '../../../components/PetCard';

export default function WishlistPage() {
  const [items, setItems] = useState([]);

  const loadWishlist = async () => {
    const res = await api.get('/wishlist');
    if (res.data.success) setItems(res.data.data.filter(i => i.petId));
  };

  useEffect(() => { loadWishlist(); }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold">Your Bookmarked Companions</h1>
      {items.length === 0 ? (
        <p className="text-slate-400 py-12 text-center">Your wishlist tracking metrics is currently empty.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item._id} className="relative">
              <PetCard pet={item.petId} />
              <button onClick={async () => { await api.delete(`/wishlist/${item.petId._id}`); loadWishlist(); }} className="w-full mt-2 bg-red-50 text-red-600 text-xs font-bold py-2 rounded-xl border border-red-100 dark:bg-red-950/20 dark:border-red-900 transition hover:bg-red-100">
                Remove from Profile Index
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}