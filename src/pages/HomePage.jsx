import React from 'react';
import { Link } from 'react-router-dom';
import SearchFilterBar from '../components/SearchFilterBar';
import PokemonList from '../components/PokemonList';
import Pagination from '../components/Pagination';
import RandomPokemonButton from '../components/RandomPokemonButton';

const HomePage = () => (
  <div className="min-h-screen bg-gradient-to-tr from-white to-indigo-100 px-4 py-8 font-sans">
    <header className="text-center mb-12">
      <h1 className="text-5xl font-extrabold text-indigo-700 drop-shadow-lg mb-4">Pokémon List</h1>
      
      {/* Buttons Section */}
      <div className="flex justify-center flex-wrap gap-4 mt-4">
      <Link
  to="/favorites"
  className="inline-flex items-center justify-center text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-full font-semibold shadow-md transition h-10"
>
Go to Favorites
</Link>

        <RandomPokemonButton />
      </div>
    </header>

    <SearchFilterBar />
    <PokemonList />
    <Pagination />
  </div>
);

export default HomePage;
