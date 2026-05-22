"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function MyRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/my-requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("My Requests Data:", res.data);
      setRequests(res.data.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Failed to load requests");
    }
  };

  const cancelRequest = async (id) => {
    if (!confirm("Are you sure you want to cancel this request?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/adoptions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Request cancelled successfully!");
      fetchRequests(); 
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error(err.response?.data?.message || "Failed to delete request");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Requests</h1>

      {requests.length === 0 ? (
        <p>You have no adoption requests yet.</p>
      ) : (
        requests.map((req) => (
          <div key={req._id} className="border border-gray-700 p-4 mb-4 rounded-lg bg-gray-900 text-white">
            <h2 className="font-bold text-xl">{req.petName}</h2>
            <p className="text-gray-400">Status: <span className="text-blue-400">{req.status}</span></p>
            <p className="text-gray-400">Pickup Date: {req.pickupDate}</p>

            <button
              onClick={() => cancelRequest(req._id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 mt-3 rounded transition"
            >
              Cancel Request
            </button>
          </div>
        ))
      )}
    </div>
  );
}