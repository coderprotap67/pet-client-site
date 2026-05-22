'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';

export default function PetDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [pet, setPet] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [messageFeedback, setMessageFeedback] = useState('');

  const [formData, setFormData] = useState({
    pickupDate: '',
    message: ''
  });

  useEffect(() => {
    if (!id) return;

    const fetchPet = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/pets/${String(id).trim()}`
        );

        console.log("PET RESPONSE:", res.data);

        if (res.data.success) {
          setPet(res.data.data);
        } else {
          setPet(null);
        }

      } catch (err) {
        console.error("FETCH ERROR:", err.response?.data || err.message);
        setPet(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);
  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-bold">
        Loading pet details...
      </div>
    );
  }
  if (!pet) {
    return (
      <div className="text-center py-20 text-red-500 font-bold text-xl">
        Pet not found
      </div>
    );
  }

  const isOwner = user?.email === pet.ownerEmail;

  const handleSubmitRequest = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const payload = {
        petId: pet._id,
        petName: pet.petName,
        pickupDate: formData.pickupDate,
        message: formData.message
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/adoptions`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data.success) {
        setMessageFeedback("Adoption request sent successfully!");
        setFormData({ pickupDate: '', message: '' });
      }

    } catch (err) {
      setMessageFeedback(
        err.response?.data?.message || "Request failed"
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={pet.image}
        alt={pet.petName}
        className="w-full h-96 object-cover rounded-2xl"
      />

      <h1 className="text-3xl font-bold mt-5">
        {pet.petName}
      </h1>

      <p className="text-gray-600 mt-2">
        {pet.description}
      </p>

      <div className="mt-4 text-sm text-gray-500 space-y-1">
        <p>Breed: {pet.breed}</p>
        <p>Age: {pet.age}</p>
        <p>Gender: {pet.gender}</p>
        <p>Location: {pet.location}</p>
      </div>

      <div className="mt-8">

        {!user ? (
          <p className="text-red-500 font-semibold">
            Please login first to adopt this pet
          </p>
        ) : isOwner ? (
          <p className="text-amber-600 font-semibold">
            You cannot adopt your own pet
          </p>
        ) : pet.status === 'adopted' ? (
          <p className="text-red-500 font-semibold">
            This pet is already adopted
          </p>
        ) : (
          <form onSubmit={handleSubmitRequest} className="space-y-4">

            <input
              type="date"
              value={formData.pickupDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pickupDate: e.target.value
                })
              }
              className="w-full border p-2 rounded"
              required
            />

            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  message: e.target.value
                })
              }
              className="w-full border p-2 rounded"
              placeholder="Write your message..."
              rows="4"
              required
            />

            <button
              type="submit"
              className="bg-amber-500 text-white px-4 py-2 rounded"
            >
              Send Adoption Request
            </button>

          </form>
        )}

        {messageFeedback && (
          <p className="mt-3 text-green-600 font-medium">
            {messageFeedback}
          </p>
        )}

      </div>

    </div>
  );
}