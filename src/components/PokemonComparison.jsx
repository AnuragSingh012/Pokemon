import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokemon } from '../context/PokemonContext';

const PokemonComparison = () => {
  const { pokemons } = usePokemon();
  const navigate = useNavigate();
  const [selectedPokemon1, setSelectedPokemon1] = useState(null);
  const [selectedPokemon2, setSelectedPokemon2] = useState(null);

  const handleSelectPokemon = (pokemon, setPokemon) => {
    setPokemon(pokemon);
  };

  const renderStats = (pokemon) => {
    if (!pokemon) return <p className="text-gray-500">Select a Pokémon to compare stats</p>;
    
    
    const stats = [
      { name: 'HP', value: pokemon.stats[0].base_stat, emoji: '❤️' },
      { name: 'Attack', value: pokemon.stats[1].base_stat, emoji: '💥' },
      { name: 'Defense', value: pokemon.stats[2].base_stat, emoji: '🛡️' },
      { name: 'Special Attack', value: pokemon.stats[3].base_stat, emoji: '🌟' },
      { name: 'Special Defense', value: pokemon.stats[4].base_stat, emoji: '🛡️' },
      { name: 'Speed', value: pokemon.stats[5].base_stat, emoji: '⚡' },
    ];

    return (
      <div className="bg-white p-6 rounded-lg flex flex-col gap-4 w-full mx-auto">
        <h3 className="text-xl font-semibold text-indigo-700">{pokemon.name}</h3>
        {stats.map((stat) => (
          <div key={stat.name} className="flex items-center justify-between">
            <span className="text-gray-700 flex items-center gap-2">
              {stat.emoji} {stat.name}
            </span>
            <div className="flex items-center gap-2">
              <div className="w-16 bg-indigo-200 rounded-full h-2">
                <div
                  className="h-2 bg-indigo-600 rounded-full"
                  style={{ width: `${(stat.value / 255) * 100}%` }}
                ></div>
              </div>
              <span className="text-gray-600">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-8">
      <button
        onClick={() => navigate(-1)}
        className="text-white cursor-pointer bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg mb-6 font-semibold"
      >
        ← Back
      </button>
      <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-8">Compare Pokémon Stats</h2>
      <div className="flex flex-col md:flex-row justify-center gap-10">
        <div className="w-full md:w-1/2 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-indigo-700 mb-4">Select Pokémon 1</h3>
            <div className="relative overflow-visible">
              <select
                onChange={(e) =>
                  handleSelectPokemon(pokemons.find((p) => p.name === e.target.value), setSelectedPokemon1)
                }
                className="w-full p-2 bg-indigo-100 text-indigo-700 rounded-md border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-10"
                style={{ marginBottom: '20px' }}
              >
                <option value="">Select Pokémon</option>
                {pokemons.map((pokemon) => (
                  <option key={pokemon.id} value={pokemon.name}>
                    {pokemon.name}
                  </option>
                ))}
              </select>
            </div>
            {renderStats(selectedPokemon1)}
          </div>
        </div>

        <div className="w-full md:w-1/2 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-indigo-700 mb-4">Select Pokémon 2</h3>
            <div className="relative overflow-visible">
              <select
                onChange={(e) =>
                  handleSelectPokemon(pokemons.find((p) => p.name === e.target.value), setSelectedPokemon2)
                }
                className="w-full p-2 bg-indigo-100 text-indigo-700 rounded-md border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-10"
                style={{ marginBottom: '20px' }}
              >
                <option value="">Select Pokémon</option>
                {pokemons.map((pokemon) => (
                  <option key={pokemon.id} value={pokemon.name}>
                    {pokemon.name}
                  </option>
                ))}
              </select>
            </div>
            {renderStats(selectedPokemon2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonComparison;
