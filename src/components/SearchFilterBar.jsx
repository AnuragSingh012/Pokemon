import React from 'react';
import { usePokemon } from '../context/PokemonContext';

const typeOptions = [
  'all', 'fire', 'water', 'grass', 'electric', 'poison', 'normal', 'bug', 'flying', 'ground',
  'psychic', 'fairy', 'fighting', 'rock', 'ghost', 'ice', 'dragon', 'steel', 'dark',
];

const SearchFilterBar = () => {
  const {
    searchQuery,
    selectedType,
    sortOption,
    setSearchQuery,
    setSelectedType,
    setSortOption,
    filterPokemons,
  } = usePokemon();

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterPokemons(query, selectedType, sortOption);
  };

  const handleTypeFilter = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    filterPokemons(searchQuery, type, sortOption);
  };

  const handleSortChange = (e) => {
    const sort = e.target.value;
    setSortOption(sort);
    filterPokemons(searchQuery, selectedType, sort);
  };

  return (
    <div className="max-w-5xl mx-auto mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      />

      <select
        value={selectedType}
        onChange={handleTypeFilter}
        className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      >
        <option value="all">All Types</option>
        {typeOptions.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>

      <select
        value={sortOption}
        onChange={handleSortChange}
        className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      >
        <option value="id">Sort by ID</option>
        <option value="name-asc">Name A–Z</option>
        <option value="name-desc">Name Z–A</option>
      </select>
    </div>
  );
};

export default SearchFilterBar;
