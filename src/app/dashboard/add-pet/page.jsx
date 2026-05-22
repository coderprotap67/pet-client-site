"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function AddPet() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    petName: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    image: "",
    location: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const newPet = {
        petName: form.petName,
        species: form.species,
        breed: form.breed,
        age: Number(form.age),
        gender: form.gender,
        image: form.image,
        location: form.location,
        description: form.description,
        status: "available",
        ownerEmail: user?.email,
      };

      const res = await axios.post(
        "http://localhost:5000/pets",
        newPet,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Pet added successfully");

        setForm({
          petName: "",
          species: "",
          breed: "",
          age: "",
          gender: "",
          image: "",
          location: "",
          description: "",
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to add pet");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          name="petName"
          placeholder="Pet Name"
          className="border p-2 w-full"
          value={form.petName}
          onChange={handleChange}
        />

        <input
          name="species"
          placeholder="Species"
          className="border p-2 w-full"
          value={form.species}
          onChange={handleChange}
        />

        <input
          name="breed"
          placeholder="Breed"
          className="border p-2 w-full"
          value={form.breed}
          onChange={handleChange}
        />

        <input
          name="age"
          type="number"
          placeholder="Age"
          className="border p-2 w-full"
          value={form.age}
          onChange={handleChange}
        />

        <input
          name="gender"
          placeholder="Gender"
          className="border p-2 w-full"
          value={form.gender}
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          className="border p-2 w-full"
          value={form.location}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 w-full"
          value={form.description}
          onChange={handleChange}
        />

        <input
          name="image"
          placeholder="Image URL"
          className="border p-2 w-full"
          value={form.image}
          onChange={handleChange}
        />

        <button className="bg-blue-500 text-white px-4 py-2 w-full">
          Add Pet
        </button>
      </form>
    </div>
  );
}
