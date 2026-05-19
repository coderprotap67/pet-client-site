'use client';
import { useState, useEffect } from 'react';
import api from '../../../utils/api';

export default function MyRequestsPage() {
  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
    const res = await api.get('/requests/my-requests');
    if (res.data.success) setRequests(res.data.data);
  };

  useEffect(() => { loadRequests(); }, []);

  const handleCancel = async (id) => {
    if (!confirm('Retract this adoption request document?')) return;
    await api.delete(`/requests/${id}`);
    loadRequests();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold">Your Adoption Claims</h1>
      {requests.length === 0 ? (
        <p className="text-slate-400 py-10 text-center">No active claims initiated by your current credentials context.</p>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xs border dark:border-slate-700 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 text-xs font-bold text-slate-400 uppercase tracking-wider border-b dark:border-slate-700">
                <th className="p-4">Pet Target Name</th>
                <th className="p-4">Pickup Target</th>
                <th className="p-4">Process State</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {requests.map((req) => (
                <tr key={req._id}>
                  <td className="p-4 font-bold">{req.petName}</td>
                  <td className="p-4 text-sm text-slate-500">{new Date(req.pickupDate).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${req.status === 'approved' ? 'bg-green-100 text-green-800' : req.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button disabled={req.status !== 'pending'} onClick={() => handleCancel(req._id)} className="bg-red-500 disabled:opacity-30 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition hover:bg-red-600">Cancel Request</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}