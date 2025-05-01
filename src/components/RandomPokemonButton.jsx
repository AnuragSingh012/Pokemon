import React from 'react';
import { usePokemon } from '../context/PokemonContext';
import { useNavigate } from 'react-router-dom';

const RandomPokemonButton = () => {
  const { pokemons } = usePokemon();
  const navigate = useNavigate();

  const getRandomPokemon = () => {
    const randomIndex = Math.floor(Math.random() * pokemons.length);
    const randomPokemon = pokemons[randomIndex];
    navigate('/compare', { state: { randomPokemon } });
  };

  return (
    <button
      onClick={getRandomPokemon}
      className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
    >
      Get Random Pokémon
    </button>
  );
};

export default RandomPokemonButton;
