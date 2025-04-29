import React, { useState, useEffect } from 'react';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
      .then((response) => response.json())
      .then((data) => {
        const fetchDetails = data.results.map(pokemon =>
          fetch(pokemon.url)
            .then(res => res.json())
            .then(detail => ({
              id: detail.id,
              name: detail.name,
              image: detail.sprites.other['official-artwork'].front_default || detail.sprites.front_default,
              types: detail.types.map(t => t.type.name),
            }))
        );

        Promise.all(fetchDetails).then(pokemonDetails => {
          setPokemons(pokemonDetails);
          setFilteredPokemons(pokemonDetails);
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const typeColors = {
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    grass: 'bg-green-500',
    electric: 'bg-yellow-400',
    poison: 'bg-purple-500',
    normal: 'bg-gray-400',
    bug: 'bg-lime-500',
    flying: 'bg-indigo-400',
    ground: 'bg-yellow-600',
    psychic: 'bg-pink-500',
    fairy: 'bg-pink-300',
    fighting: 'bg-orange-500',
    rock: 'bg-yellow-700',
    ghost: 'bg-indigo-700',
    ice: 'bg-cyan-300',
    dragon: 'bg-purple-700',
    steel: 'bg-gray-600',
    dark: 'bg-gray-800',
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterPokemons(query, selectedType);
  };

  const handleTypeFilter = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    filterPokemons(searchQuery, type);
  };

  const filterPokemons = (query, type) => {
    const filtered = pokemons.filter(p => {
      const matchesName = p.name.toLowerCase().includes(query);
      const matchesType = type === 'all' || p.types.includes(type);
      return matchesName && matchesType;
    });
    setFilteredPokemons(filtered);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 text-xl font-medium">
        Loading Pokémons...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-white to-indigo-100 px-4 py-8 font-sans">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-indigo-700 drop-shadow-lg mb-2">Pokédex</h1>
      </header>

      <div className="max-w-4xl mx-auto mb-10 flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <select
          value={selectedType}
          onChange={handleTypeFilter}
          className="w-full md:w-1/3 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="all">All Types</option>
          {Object.keys(typeColors).map(type => (
            <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
          ))}
        </select>
      </div>

      {filteredPokemons.length === 0 ? (
        <div className="text-center text-xl text-gray-500 mt-20">
          No Pokémon found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {filteredPokemons.map((pokemon) => (
            <div
              key={pokemon.id}
              className="relative bg-white/60 backdrop-blur-md border border-white/20 shadow-xl rounded-3xl p-5 flex flex-col items-center transition transform hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-32 h-32 object-contain mb-4 drop-shadow-md"
              />
              <h2 className="text-2xl font-semibold capitalize text-gray-800 mb-1">{pokemon.name}</h2>
              <p className="text-sm text-gray-500 mb-3">#{pokemon.id}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className={`text-white text-xs font-semibold px-3 py-1 rounded-full ${typeColors[type] || 'bg-gray-500'}`}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default App;
