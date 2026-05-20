'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PetCard from '../../components/PetCard';
import { motion } from 'framer-motion';

const SPECIES_OPTIONS = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];

export default function AllPetsPage() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState([]);

  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
        const speciesQuery = selectedSpecies.length > 0 ? selectedSpecies.join(',') : '';
        const url = `http://localhost:5000/pets?search=${search}&species=${speciesQuery}`;
        const res = await axios.get(url);
        if (res.data.success) setPets(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    const debounceTimer = setTimeout(fetchFilteredData, 300);
    return () => clearTimeout(debounceTimer);
  }, [search, selectedSpecies]);

  const handleSpeciesCheckbox = (species) => {
    if (selectedSpecies.includes(species)) {
      setSelectedSpecies(selectedSpecies.filter((item) => item !== species));
    } else {
      setSelectedSpecies([...selectedSpecies, species]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-4 gap-8">
      <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl h-fit border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Filter Control Panel</h3>
        
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Search by Name</label>
          <input 
            type="text" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type pet name..." 
            className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Species Category</label>
          <div className="space-y-2">
            {SPECIES_OPTIONS.map((species) => (
              <label key={species} className="flex items-center space-x-3 cursor-pointer text-slate-700 dark:text-slate-300">
                <input 
                  type="checkbox" 
                  checked={selectedSpecies.includes(species)}
                  onChange={() => handleSpeciesCheckbox(species)}
                  className="w-4 h-4 text-amber-500 border-slate-300 rounded focus:ring-amber-500" 
                />
                <span>{species}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="lg:col-span-3">
        {pets.length === 0 ? (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400">
            No matching pet profiles discovered based on specified metrics.
          </div>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}