"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditPetPage() {
  const { id } = useParams();
  const router = useRouter();
  const [pet, setPet] = useState({ petName: "", price: "", species: "", image: "" });

  useEffect(() => {
    axios.get(`http://localhost:5000/pets/${id}`).then((res) => {
      setPet(res.data.data);
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.patch(`http://localhost:5000/pets/${id}`, pet, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Pet updated successfully!");
      router.push("/dashboard/my-listings");
    } catch (err) {
      toast.error("Update failed!");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Pet: {pet.petName}</h1>
      <form onSubmit={handleUpdate} className="max-w-md space-y-4">
        <input 
          value={pet.petName} 
          onChange={(e) => setPet({...pet, petName: e.target.value})}
          className="border p-2 w-full" placeholder="Name" 
        />
        <input 
          value={pet.price} 
          onChange={(e) => setPet({...pet, price: e.target.value})}
          className="border p-2 w-full" placeholder="Price" 
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Update</button>
      </form>
    </div>
  );
}