import React, { createContext, useContext, useState, useEffect } from 'react';

const PokemonContext = createContext();

export const usePokemon = () => useContext(PokemonContext);

export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortOption, setSortOption] = useState('id-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    let result = [...pokemons];

    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedType !== 'all') {
      result = result.filter(p => p.types.includes(selectedType));
    }

    result.sort((a, b) => {
      if (sortOption === 'name-asc') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'name-desc') {
        return b.name.localeCompare(a.name);
      } else if (sortOption === 'id-desc') {
        return b.id - a.id;
      } else {
        return a.id - b.id;
      }
    });

    setFilteredPokemons(result);
  }, [searchQuery, selectedType, sortOption, pokemons]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

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

  const toggleFavorite = (pokemon) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some(fav => fav.id === pokemon.id);
      const newFavorites = isFavorite
        ? prevFavorites.filter(fav => fav.id !== pokemon.id)
        : [...prevFavorites, pokemon];

      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (pokemon) => {
    return favorites.some(fav => fav.id === pokemon.id);
  };

  return (
    <PokemonContext.Provider value={{
      pokemons,
      filteredPokemons,
      favorites,
      setFavorites,
      loading,
      searchQuery,
      selectedType,
      sortOption,
      currentPage,
      itemsPerPage,
      setSearchQuery,
      setSelectedType,
      setSortOption,
      setCurrentPage,
      toggleFavorite,
      isFavorite,
    }}>
      {children}
    </PokemonContext.Provider>
  );
};
