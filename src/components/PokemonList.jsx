import React from 'react';
import { usePokemon } from '../context/PokemonContext';
import PokemonCard from './PokemonCard';

const PokemonList = () => {
  const { filteredPokemons, loading, currentPage, itemsPerPage } = usePokemon();

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-xl font-medium">Loading Pokémons...</div>;
  }

  const start = (currentPage - 1) * itemsPerPage;
  const paginatedPokemons = filteredPokemons.slice(start, start + itemsPerPage);

  if (paginatedPokemons.length === 0) {
    return <div className="text-center text-xl text-gray-500 mt-20">No Pokémon found matching your criteria.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
      {paginatedPokemons.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />)}
    </div>
  );
};

export default PokemonList;