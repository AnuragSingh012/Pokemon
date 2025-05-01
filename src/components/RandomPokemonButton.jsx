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
      className="inline-flex cursor-pointer items-center justify-center text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-full font-semibold shadow-md transition h-10"
    >
      Compare Pokemon
    </button>
  );
};

export default RandomPokemonButton;
