import React from 'react';
import SearchFilterBar from '../components/SearchFilterBar';
import PokemonList from '../components/PokemonList';
import Pagination from '../components/Pagination';

const HomePage = () => (
  <div className="min-h-screen bg-gradient-to-tr from-white to-indigo-100 px-4 py-8 font-sans">
    <header className="text-center mb-12">
      <h1 className="text-5xl font-extrabold text-indigo-700 drop-shadow-lg mb-2">Pokédex</h1>
    </header>
    <SearchFilterBar />
    <PokemonList />
    <Pagination />
  </div>
);

export default HomePage;
