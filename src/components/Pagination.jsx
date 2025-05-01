import React from 'react';
import { usePokemon } from '../context/PokemonContext';

const Pagination = () => {
  const { filteredPokemons, currentPage, setCurrentPage, itemsPerPage } = usePokemon();
  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);

  if (totalPages <= 1) return null;

  const prev = () => setCurrentPage(p => Math.max(p - 1, 1));
  const next = () => setCurrentPage(p => Math.min(p + 1, totalPages));

  return (
    <div className="flex justify-center items-center mt-10 gap-6">
      <button
        onClick={prev}
        disabled={currentPage === 1}
        className="px-5 py-2 bg-gradient-to-r cursor-pointer from-indigo-500 to-purple-500 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <span className="text-gray-800 font-semibold text-lg">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={next}
        disabled={currentPage === totalPages}
        className="px-5 py-2 bg-gradient-to-r cursor-pointer from-purple-500 to-indigo-500 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
