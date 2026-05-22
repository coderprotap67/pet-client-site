'use client';

import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function MyListingsDashboard() {
  const [listings, setListings] = useState([]);
  const [stats, setStats] = useState({ total: 0, available: 0, adopted: 0 });
  const router = useRouter();

  const fetchDashboardMetadata = async () => {
    try {
      const res = await api.get('/pets/my-listings');
      const data = res.data?.data || [];
      setListings(data);
      setStats({
        total: data.length,
        available: data.filter(p => p.status === 'available').length,
        adopted: data.filter(p => p.status === 'adopted').length,
      });
    } catch (err) { 
      console.error("Error fetching listings:", err); 
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      try {
        await api.delete(`/pets/${id}`); 
        
        toast.success("Deleted successfully!");
        fetchDashboardMetadata();
      } catch (err) { 
        console.error("Delete Error:", err);
        toast.error("Delete failed!"); 
      }
    }
  };

  useEffect(() => { 
    fetchDashboardMetadata(); 
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-[#0b0e14] min-h-screen text-white">
      <h1 className="text-3xl font-bold">My Listings</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#1a2234] p-6 rounded-lg text-center border border-gray-700">
          <h2 className="text-3xl font-bold">{stats.total}</h2>
          <p className="text-gray-400">Total Listings</p>
        </div>
        <div className="bg-[#1a2234] p-6 rounded-lg text-center border border-gray-700">
          <h2 className="text-3xl font-bold">{stats.available}</h2>
          <p className="text-gray-400">Available</p>
        </div>
        <div className="bg-[#1a2234] p-6 rounded-lg text-center border border-gray-700">
          <h2 className="text-3xl font-bold">{stats.adopted}</h2>
          <p className="text-gray-400">Adopted</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((pet) => (
          <div key={pet._id} className="bg-[#1a2234] rounded-xl border border-gray-700 overflow-hidden">
            <img src={pet.image} alt={pet.petName} className="w-full h-48 object-cover" />
            
            <div className="p-4">
              <h3 className="text-xl font-bold mb-1">{pet.petName}</h3>
              <p className="text-pink-500 font-bold mb-4">${pet.price}</p>
              
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => router.push(`/pets/${pet._id}`)}
                  className="bg-blue-600 hover:bg-blue-700 py-2 rounded transition"
                >View</button>
                
                <button 
                  onClick={() => router.push(`/dashboard/edit-pet/${pet._id}`)}
                  className="bg-yellow-600 hover:bg-yellow-700 py-2 rounded transition"
                >Edit</button>
                
                <button 
                  onClick={() => router.push('/dashboard/my-requests')}
                  className="bg-green-600 hover:bg-green-700 py-2 rounded col-span-2 transition"
                >Requests</button>
                
                <button 
                  onClick={() => handleDelete(pet._id)} 
                  className="bg-red-600 hover:bg-red-700 py-2 rounded col-span-2 transition"
                >Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}