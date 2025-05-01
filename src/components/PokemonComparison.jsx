import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokemon } from '../context/PokemonContext';

const PokemonComparison = () => {
  const { pokemons } = usePokemon();
  const navigate = useNavigate();
  const [selectedPokemon1, setSelectedPokemon1] = useState(null);
  const [selectedPokemon2, setSelectedPokemon2] = useState(null);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const fetchPokemonDetails = async (name, setPokemon, setLoading) => {
    if (!name) return;
    setLoading(true);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await res.json();
      setPokemon(data);
    } catch (error) {
      console.error('Failed to fetch Pokémon data:', error);
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  const setRandomPokemons = () => {
    if (pokemons.length < 2) return;

    const getRandomIndex = () => Math.floor(Math.random() * pokemons.length);

    let index1 = getRandomIndex();
    let index2 = getRandomIndex();

    while (index2 === index1) {
      index2 = getRandomIndex();
    }

    const name1 = pokemons[index1].name;
    const name2 = pokemons[index2].name;

    fetchPokemonDetails(name1, setSelectedPokemon1, setLoading1);
    fetchPokemonDetails(name2, setSelectedPokemon2, setLoading2);
  };

  const renderStats = (pokemon, loading) => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      );
    }

    if (!pokemon) return <p className="text-gray-500">Select a Pokémon to compare stats</p>;

    const stats = [
      { name: 'HP', value: pokemon.stats[0].base_stat, emoji: '❤️' },
      { name: 'Attack', value: pokemon.stats[1].base_stat, emoji: '💥' },
      { name: 'Defense', value: pokemon.stats[2].base_stat, emoji: '🛡️' },
      { name: 'Special Attack', value: pokemon.stats[3].base_stat, emoji: '🌟' },
      { name: 'Special Defense', value: pokemon.stats[4].base_stat, emoji: '🛡️' },
      { name: 'Speed', value: pokemon.stats[5].base_stat, emoji: '⚡' },
    ];

    const pokemonImage =
      pokemon.sprites?.other?.['official-artwork']?.front_default ||
      pokemon.sprites?.front_default ||
      '/path/to/default-image.png';

    return (
      <div className="bg-white py-6 px-2 rounded-lg flex flex-col gap-4 w-full mx-auto">
        <div className="flex justify-center mb-4">
          <img
            src={pokemonImage}
            alt={pokemon.name}
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain mx-auto transition-transform duration-300 hover:scale-105"
          />
        </div>

        <h3 className="text-xl sm:text-2xl font-semibold text-indigo-700 capitalize">{pokemon.name}</h3>
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm sm:text-base"
          >
            <span className="text-gray-700 flex items-center gap-2 w-full sm:w-auto">
              {stat.emoji} {stat.name}
            </span>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="w-full sm:w-16 bg-indigo-200 rounded-full h-2">
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
    <div className="min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="text-white cursor-pointer bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg mb-6 font-semibold"
      >
        ← Back
      </button>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-700 mb-8">Compare Pokémon Stats</h2>
      <div className="flex flex-col sm:flex-row justify-center gap-6 md:gap-10">
        <div className="w-full sm:w-5/6 md:w-3/4 lg:w-2/3 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl sm:text-2xl font-semibold text-indigo-700 mb-4">Select Pokémon 1</h3>
            <select
              onChange={(e) => {
                const value = e.target.value;
                if (!value) {
                  setSelectedPokemon1(null);
                } else {
                  fetchPokemonDetails(value, setSelectedPokemon1, setLoading1);
                }
              }}
              className="w-full p-2 bg-indigo-100 text-indigo-700 rounded-md border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-10 mb-4"
            >
              <option value="">Select Pokémon</option>
              {pokemons.map((pokemon) => (
                <option key={pokemon.name} value={pokemon.name}>
                  {pokemon.name}
                </option>
              ))}
            </select>
            {renderStats(selectedPokemon1, loading1)}
          </div>
        </div>

        <div className="w-full sm:w-5/6 md:w-3/4 lg:w-2/3 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl sm:text-2xl font-semibold text-indigo-700 mb-4">Select Pokémon 2</h3>
            <select
              onChange={(e) => {
                const value = e.target.value;
                if (!value) {
                  setSelectedPokemon2(null);
                } else {
                  fetchPokemonDetails(value, setSelectedPokemon2, setLoading2);
                }
              }}
              className="w-full p-2 bg-indigo-100 text-indigo-700 rounded-md border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-10 mb-4"
            >
              <option value="">Select Pokémon</option>
              {pokemons.map((pokemon) => (
                <option key={pokemon.name} value={pokemon.name}>
                  {pokemon.name}
                </option>
              ))}
            </select>
            {renderStats(selectedPokemon2, loading2)}
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-6">
        <button
          onClick={setRandomPokemons}
          className="text-white cursor-pointer bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-semibold"
        >
          🎲 Compare Random Pokémon
        </button>
      </div>
    </div>
  );
};

export default PokemonComparison;
