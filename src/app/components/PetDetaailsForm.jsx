'use client';
import { useState } from 'react';

export default function PetDetailsForm({ initialData = {}, onSubmit, buttonText = 'Save Pet Details' }) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    species: initialData.species || 'Dog',
    breed: initialData.breed || '',
    age: initialData.age || '',
    gender: initialData.gender || 'Male',
    imageUrl: initialData.imageUrl || '',
    healthStatus: initialData.healthStatus || '',
    vaccinationStatus: initialData.vaccinationStatus || '',
    location: initialData.location || '',
    adoptionFee: initialData.adoptionFee || '',
    description: initialData.description || '',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700">
      <div><label className="text-sm font-bold text-slate-700 dark:text-slate-300">Pet Name</label><input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full mt-1 p-2.5 border rounded-lg bg-transparent" /></div>
      <div><label className="text-sm font-bold text-slate-700 dark:text-slate-300">Species</label><select name="species" value={formData.species} onChange={handleChange} className="w-full mt-1 p-2.5 border rounded-lg bg-white dark:bg-slate-900"><option>Dog</option><option>Cat</option><option>Bird</option><option>Rabbit</option><option>Other</option></select></div>
      <div><label className="text-sm font-bold text-slate-700 dark:text-slate-300">Breed</label><input required type="text" name="breed" value={formData.breed} onChange={handleChange} className="w-full mt-1 p-2.5 border rounded-lg bg-transparent" /></div>
      <div><label className="text-sm font-bold text-slate-700 dark:text-slate-300">Age (Years)</label><input required type="number" name="age" value={formData.age} onChange={handleChange} className="w-full mt-1 p-2.5 border rounded-lg bg-transparent" /></div>
      <div><label className="text-sm font-bold text-slate-700 dark:text-slate-300">Gender</label><select name="gender" value={formData.gender} onChange={handleChange} className="w-full mt-1 p-2.5 border rounded-lg bg-white dark:bg-slate-900"><option>Male</option><option>Female</option></select></div>
      <div><label className="text-sm font-bold text-slate-700 dark:text-slate-300">Image URL</label><input required type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full mt-1 p-2.5 border rounded-lg bg-transparent" /></div>
      <div><label className="text-sm font-bold text-slate-700 dark:text-slate-300">Health Status</label><input required type="text" name="healthStatus" value={formData.healthStatus} onChange={handleChange} className="w-full mt-1 p-2.5 border rounded-lg bg-transparent" placeholder="e.g. Excellent, Healthy" /></div>
      <div><label className="text-sm font-bold text-slate-700 dark:text-slate-300">Vaccination Status</label><input required type="text" name="vaccinationStatus" value={formData.vaccinationStatus} onChange={handleChange} className="w-full mt-1 p-2.5 border rounded-lg bg-transparent" placeholder="e.g. Fully Vaccinated" /></div>
      <div><label className="text-sm font-bold text-slate-700 dark:text-slate-300">Location</label><input required type="text" name="location" value={formData.location} onChange={handleChange} className="w-full mt-1 p-2.5 border rounded-lg bg-transparent" placeholder="City, Country" /></div>
      <div><label className="text-sm font-bold text-slate-700 dark:text-slate-300">Adoption Fee ($)</label><input required type="number" name="adoptionFee" value={formData.adoptionFee} onChange={handleChange} className="w-full mt-1 p-2.5 border rounded-lg bg-transparent" /></div>
      <div className="md:col-span-2"><label className="text-sm font-bold text-slate-700 dark:text-slate-300">Description</label><textarea required rows="4" name="description" value={formData.description} onChange={handleChange} className="w-full mt-1 p-2.5 border rounded-lg bg-transparent"></textarea></div>
      <div className="md:col-span-2"><button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl transition shadow-md">{buttonText}</button></div>
    </form>
  );
}