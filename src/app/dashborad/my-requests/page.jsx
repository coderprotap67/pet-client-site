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

      const res = await axios.get(
        "http://localhost:5000/my-requests",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setRequests(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const cancelRequest = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/adoptions/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Request cancelled");
      fetchRequests();
    } catch (err) {
      toast.error("Failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Requests</h1>

      {requests.map((req) => (
        <div key={req._id} className="border p-3 mb-3 rounded">
          <h2 className="font-bold">{req.petName}</h2>
          <p>Status: {req.status}</p>
          <p>Pickup: {req.pickupDate}</p>

          <button
            onClick={() => cancelRequest(req._id)}
            className="bg-red-500 text-white px-3 py-1 mt-2"
          >
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
}