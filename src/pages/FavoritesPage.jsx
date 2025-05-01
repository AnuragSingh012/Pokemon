import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokemon } from '../context/PokemonContext';
import PokemonCard from '../components/PokemonCard';

const FavoritesPage = () => {
  const { favorites, setFavorites } = usePokemon();
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, [setFavorites]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-white to-indigo-100 px-4 py-8 font-sans">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-indigo-700 drop-shadow-lg mb-2">Favorite Pokémon</h1>
      </header>

      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg mb-6 font-semibold"
      >
        ← Back
      </button>

      {favorites.length === 0 ? (
        <div className="text-center text-xl text-gray-500 mt-20">
          You have no favorite Pokémon yet!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {favorites.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
