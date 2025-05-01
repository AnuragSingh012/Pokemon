import React, { createContext, useContext, useEffect, useState } from 'react';

const PokemonContext = createContext();

export const usePokemon = () => useContext(PokemonContext);

export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [sortOption, setSortOption] = useState('id');
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

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

  const filterPokemons = (query, type, sort = sortOption) => {
    let filtered = pokemons.filter(p => {
      const matchesName = p.name.toLowerCase().includes(query);
      const matchesType = type === 'all' || p.types.includes(type);
      return matchesName && matchesType;
    });
  

    filtered = sortPokemons(filtered, sort);
    setFilteredPokemons(filtered);
    setCurrentPage(1);
  };
  
  const sortPokemons = (list, sort) => {
    switch (sort) {
      case 'name-asc':
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return [...list].sort((a, b) => b.name.localeCompare(a.name));
      case 'id':
      default:
        return [...list].sort((a, b) => a.id - b.id);
    }
  };

  return (
    <PokemonContext.Provider value={{
      pokemons,
      filteredPokemons,
      loading,
      searchQuery,
      selectedType,
      sortOption,
      currentPage,
      itemsPerPage,
      setSearchQuery,
      setSelectedType,
      setCurrentPage,
      setSortOption,
      filterPokemons,
    }}>{children}</PokemonContext.Provider>
  );
};