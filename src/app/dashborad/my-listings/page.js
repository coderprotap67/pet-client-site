'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MyListingsDashboard() {
  const [listings, setListings] = useState([]);
  const [selectedPetRequests, setSelectedPetRequests] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [stats, setStats] = useState({ total: 0, available: 0, adopted: 0 });

  const fetchDashboardMetadata = async () => {
    const res = await axios.get('http://localhost:5000/api/pets/my-listings');
    if (res.data.success) {
      const data = res.data.data;
      setListings(data);
      
      const total = data.length;
      const available = data.filter(p => p.status === 'available').length;
      const adopted = data.filter(p => p.status === 'adopted').length;
      setStats({ total, available, adopted });
    }
  };

  useEffect(() => { fetchDashboardMetadata(); }, []);

  const openRequestsModal = async (petId) => {
    const res = await axios.get(`http://localhost:5000/api/requests/pet/${petId}`);
    if (res.data.success) {
      setSelectedPetRequests(res.data.data);
      setModalOpen(true);
    }
  };

  const handleProcessAction = async (requestId, action) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/requests/${requestId}/process`, { action });
      if (res.data.success) {
        setModalOpen(false);
        fetchDashboardMetadata(); // Re-fetch metrics data to instantly reflect single-approval modifications
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Processing error');
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* METRIC SUMMARIES */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"><p className="text-sm text-slate-400">Total Listings</p><p className="text-3xl font-extrabold text-slate-900 dark:text-white">{stats.total}</p></div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"><p className="text-sm text-green-500">Available Status</p><p className="text-3xl font-extrabold text-green-600">{stats.available}</p></div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"><p className="text-sm text-amber-500">Adopted Count</p><p className="text-3xl font-extrabold text-amber-600">{stats.adopted}</p></div>
      </div>

      {/* ADMIN DATA INTERFACE TABLE */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm overflow-hidden border border-slate-100 dark:border-slate-700">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900 text-slate-400 text-xs uppercase tracking-wider font-semibold border-b dark:border-slate-700">
              <th className="p-4">Pet Meta</th>
              <th className="p-4">Species</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions Matrix</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {listings.map((pet) => (
              <tr key={pet._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                <td className="p-4 font-bold text-slate-900 dark:text-white">{pet.name}</td>
                <td className="p-4 text-slate-600 dark:text-slate-300">{pet.species}</td>
                <td className="p-4"><span className={`text-xs px-2.5 py-1 rounded-full font-bold ${pet.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>{pet.status}</span></td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => openRequestsModal(pet._id)} className="bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">Requests</button>
                  <button className="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white text-xs font-semibold px-3 py-1.5 rounded-lg">Edit</button>
                  <button className="bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SINGLE-APPROVAL PROCESS MODAL INTERFACE */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-xl relative m-4 max-h-[85vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Listing Applicant Queue</h3>
            {selectedPetRequests.length === 0 ? (
              <p className="text-slate-400 py-6 text-center">No active applicants historical claims found targeting this asset item.</p>
            ) : (
              <div className="space-y-4">
                {selectedPetRequests.map((req) => (
                  <div key={req._id} className="p-4 border dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-900 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{req.requesterName} ({req.requesterEmail})</p>
                      <p className="text-xs text-slate-500">Pickup Schedule: {new Date(req.pickupDate).toLocaleDateString()}</p>
                      <p className="text-sm mt-2 text-slate-600 dark:text-slate-400">"{req.message}"</p>
                      <p className="text-xs font-bold uppercase mt-1 tracking-wider text-amber-500">Current state: {req.status}</p>
                    </div>
                    <div className="space-x-2 flex shrink-0">
                      <button 
                        disabled={req.status !== 'pending'} 
                        onClick={() => handleProcessAction(req._id, 'approved')} 
                        className="bg-green-600 disabled:opacity-40 text-white font-bold text-xs px-3 py-2 rounded-lg"
                      >
                        Approve
                      </button>
                      <button 
                        disabled={req.status !== 'pending'} 
                        onClick={() => handleProcessAction(req._id, 'rejected')} 
                        className="bg-red-500 disabled:opacity-40 text-white font-bold text-xs px-3 py-2 rounded-lg"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => setModalOpen(false)} className="mt-6 w-full py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-bold rounded-xl text-sm">Close Queue Layout</button>
          </div>
        </div>
      )}
    </div>
  );
}