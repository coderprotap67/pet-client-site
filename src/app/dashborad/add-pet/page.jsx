"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddPet() {
  const [form, setForm] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

const newPet = {
  petName: form.name.value,
  species: form.species.value,
  breed: form.breed.value,
  age: form.age.value,
  gender: form.gender?.value,
  image: form.image.value,
  location: form.location.value,
  description: form.description.value,
  status: "available",
  ownerEmail: user?.email,
};
      const res = await axios.post(
        "http://localhost:5000/pets",
        newPet,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        toast.success("Pet added successfully");
        setForm({});
      }
    } catch (err) {
      toast.error("Failed to add pet");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          placeholder="Pet Name"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Species"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, species: e.target.value })}
        />

        <input
          placeholder="Breed"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, breed: e.target.value })}
        />

        <input
          placeholder="Age"
          type="number"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />

        <input
          placeholder="Location"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          placeholder="Image URL"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <button className="bg-blue-500 text-white px-4 py-2 w-full">
          Add Pet
        </button>
      </form>
    </div>
  );
}



// jwt secret tokoen ki babe pabo backend theke?

// JWT secret token typically should not be exposed to the frontend. It is used on the backend to sign and verify JWTs. The frontend should only receive the JWT itself after a successful login or registration, which it can then store (e.g., in localStorage) and include in subsequent requests to authenticate the user.