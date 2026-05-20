'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';

export default function PetDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [pet, setPet] = useState(null);
  const [formData, setFormData] = useState({ pickupDate: '', message: '' });
  const [messageFeedback, setMessageFeedback] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/pets/${id}`).then((res) => {
      if (res.data.success) setPet(res.data.data);
    });
  }, [id]);

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    try {
      const payload = { petId: pet._id, ...formData };
      const res = await axios.post('http://localhost:5000/api/requests', payload);
      if (res.data.success) setMessageFeedback('Adoption request dispatched successfully!');
    } catch (err) {
      setMessageFeedback(err.response?.data?.message || 'Error executing processing loops.');
    }
  };

  if (!pet) return <div className="text-center py-20">Loading specifications metadata...</div>;

  const isOwner = user?.email === pet.ownerEmail;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-12">
      {/* LEFT COMPONENT: TECH METRICS */}
      <div className="lg:col-span-2 space-y-6">
        <img src={pet.imageUrl} alt={pet.name} className="w-full h-96 object-cover rounded-3xl shadow-lg" />
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">{pet.name}</h1>
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase ${pet.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{pet.status}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl text-center"><p className="text-xs text-slate-400">Breed</p><p className="font-bold text-slate-800 dark:text-white">{pet.breed}</p></div>
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl text-center"><p className="text-xs text-slate-400">Age</p><p className="font-bold text-slate-800 dark:text-white">{pet.age} Years</p></div>
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl text-center"><p className="text-xs text-slate-400">Gender</p><p className="font-bold text-slate-800 dark:text-white">{pet.gender}</p></div>
          </div>
          <p className="mt-8 text-slate-600 dark:text-slate-300 leading-relaxed">{pet.description}</p>
        </div>
      </div>

      {/* RIGHT COMPONENT: SECURE FORM MODAL PANEL */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-md border h-fit border-slate-100 dark:border-slate-700">
        <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Adoption Terminal</h3>
        
        {!user ? (
          <p className="text-red-500 text-sm font-medium">Please sign in to proceed with request dispatch routines.</p>
        ) : isOwner ? (
          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-xl text-amber-800 dark:text-amber-400 text-sm font-medium">
            ⚠️ Constraint Protection Active: You are hardcoded blocked from submitting adoption forms for your own listings.
          </div>
        ) : pet.status === 'adopted' ? (
          <p className="text-red-500 text-sm font-medium">This asset is already marked adopted.</p>
        ) : (
          <form onSubmit={handleSubmitRequest} className="space-y-4">
            <div><label className="text-xs font-bold text-slate-400">Pet Name</label><input type="text" readOnly value={pet.name} className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-slate-500 border-none mt-1 outline-none"/></div>
            <div><label className="text-xs font-bold text-slate-400">Your Identity</label><input type="text" readOnly value={user.name} className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-slate-500 border-none mt-1 outline-none"/></div>
            <div><label className="text-xs font-bold text-slate-400">Your Email Contact</label><input type="text" readOnly value={user.email} className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-slate-500 border-none mt-1 outline-none"/></div>
            <div><label className="text-xs font-bold text-slate-700 dark:text-slate-300">Target Pickup Date</label><input type="date" required value={formData.pickupDate} onChange={(e) => setFormData({...formData, pickupDate: e.target.value})} className="w-full px-4 py-2 border rounded-lg mt-1 bg-white dark:bg-slate-900 dark:border-slate-700 text-slate-900 dark:text-white"/></div>
            <div><label className="text-xs font-bold text-slate-700 dark:text-slate-300">Intent Statement Message</label><textarea required rows="4" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-2 border rounded-lg mt-1 bg-white dark:bg-slate-900 dark:border-slate-700 text-slate-900 dark:text-white"></textarea></div>
            <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl transition shadow-md shadow-amber-500/10">Submit Adoption Request</button>
            {messageFeedback && <p className="text-center text-sm font-semibold text-amber-600 dark:text-amber-400 mt-2">{messageFeedback}</p>}
          </form>
        )}
      </div>
    </div>
  );
}