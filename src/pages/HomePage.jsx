import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import SearchFilterBar from '../components/SearchFilterBar';
import PokemonList from '../components/PokemonList';
import Pagination from '../components/Pagination';

const HomePage = () => (
  <div className="min-h-screen bg-gradient-to-tr from-white to-indigo-100 px-4 py-8 font-sans">
    <header className="text-center mb-12">
      <h1 className="text-5xl font-extrabold text-indigo-700 drop-shadow-lg mb-2">Pokémon List</h1>
      <Link
        to="/favorites"
        className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-semibold"
      >
        Go to Favorites
      </Link>
    </header>
    <SearchFilterBar />
    <PokemonList />
    <Pagination />
  </div>
);

export default HomePage;
