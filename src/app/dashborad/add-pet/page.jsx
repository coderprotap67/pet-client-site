"use client";
import { useState } from "react";
import axiosSecure from "@/lib/axiosSecure"; 
import toast from "react-hot-toast";

const AddPet = () => {
  const handleAddPet = async (e) => {
    e.preventDefault();
    const form = e.target;
        const newPet = {
      name: form.name.value,
      species: form.species.value,
      breed: form.breed.value,
      age: parseInt(form.age.value),
      location: form.location.value,
      description: form.description.value,
      image: form.image.value,
    };

    try {
      const res = await axiosSecure.post("/pets", newPet);
      if (res.data.success) {
        toast.success("Pet added successfully!");
        form.reset();
      }
    } catch (err) {
      toast.error("Failed to add pet!");
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add a Pet</h2>
      <form onSubmit={handleAddPet} className="space-y-4">
        <input type="text" name="name" placeholder="Pet Name" className="w-full border p-2" required />
        <input type="text" name="species" placeholder="Species (Dog/Cat)" className="w-full border p-2" required />
        <input type="text" name="breed" placeholder="Breed" className="w-full border p-2" />
        <input type="number" name="age" placeholder="Age" className="w-full border p-2" />
        <input type="text" name="location" placeholder="Location" className="w-full border p-2" />
        <textarea name="description" placeholder="Description" className="w-full border p-2" />
        <input type="text" name="image" placeholder="Image URL" className="w-full border p-2" />
        
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Pet
        </button>
      </form>
    </div>
  );
};

export default AddPet;