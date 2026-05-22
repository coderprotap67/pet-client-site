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
        const speciesQuery =
          selectedSpecies.length > 0 ? selectedSpecies.join(',') : '';

        const url = `http://localhost:5000/pets?search=${search}&species=${speciesQuery}`;

        const res = await axios.get(url);

        if (res.data.success) {
          setPets(res.data.data);
        }
      } catch (err) {
        console.error("FETCH ERROR:", err);
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
      <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl h-fit border">
        <h3 className="text-xl font-bold mb-4">Filter</h3>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search pet..."
          className="w-full p-2 border rounded mb-4"
        />

        {SPECIES_OPTIONS.map((species) => (
          <label key={species} className="block">
            <input
              type="checkbox"
              checked={selectedSpecies.includes(species)}
              onChange={() => handleSpeciesCheckbox(species)}
            />{' '}
            {species}
          </label>
        ))}
      </div>
      <div className="lg:col-span-3">
        {pets.length === 0 ? (
          <p className="text-center">No pets found</p>
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