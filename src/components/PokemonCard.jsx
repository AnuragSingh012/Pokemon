import React from 'react';
import { Link } from 'react-router-dom';
import { usePokemon } from '../context/PokemonContext';

const typeColors = {
  fire: 'bg-red-500', water: 'bg-blue-500', grass: 'bg-green-500', electric: 'bg-yellow-400',
  poison: 'bg-purple-500', normal: 'bg-gray-400', bug: 'bg-lime-500', flying: 'bg-indigo-400',
  ground: 'bg-yellow-600', psychic: 'bg-pink-500', fairy: 'bg-pink-300', fighting: 'bg-orange-500',
  rock: 'bg-yellow-700', ghost: 'bg-indigo-700', ice: 'bg-cyan-300', dragon: 'bg-purple-700',
  steel: 'bg-gray-600', dark: 'bg-gray-800'
};


const PokemonCard = ({ pokemon }) => {
  const { toggleFavorite, isFavorite } = usePokemon();

  const handleFavoriteClick = () => {
    toggleFavorite(pokemon);
  };

  return (
    <div className="relative bg-white/60 backdrop-blur-md border border-white/20 shadow-xl rounded-3xl p-5 flex flex-col items-center">
  <Link to={`/pokemon/${pokemon.name}`} className="w-full flex flex-col items-center hover:scale-105 transition">
    <img src={pokemon.image} alt={pokemon.name} className="w-32 h-32 object-contain mb-4 drop-shadow-md" />
    <h2 className="text-2xl font-semibold capitalize text-gray-800 mb-1">{pokemon.name}</h2>
    <p className="text-sm text-gray-500 mb-3">#{pokemon.id}</p>
  </Link>

  <div className="flex flex-wrap justify-center gap-2 mb-3">
    {pokemon.types.map(type => (
      <span key={type} className={`text-white text-xs font-semibold px-3 py-1 rounded-full ${typeColors[type] || 'bg-gray-500'}`}>
        {type}
      </span>
    ))}
  </div>

  <button
    onClick={handleFavoriteClick}
    className={`absolute top-2 right-2 p-2 rounded-full ${isFavorite(pokemon) ? 'bg-red-500' : 'bg-gray-300'}`}
  >
    {isFavorite(pokemon) ? '❤️' : '♡'}
  </button>
</div>

  );
};

export default PokemonCard;