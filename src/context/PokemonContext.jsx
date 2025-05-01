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
  const [sortOption, setSortOption] = useState('id');
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

    if (sortOption === 'name-asc') {
      result = result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name-desc') {
      result = result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === 'id') {
      result = result.sort((a, b) => a.id - b.id);
    }

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
        const fetchDetails = data.results.map((pokemon) =>
          fetch(pokemon.url)
            .then((res) => res.json())
            .then((detail) => ({
              id: detail.id,
              name: detail.name,
              image: detail.sprites.other['official-artwork'].front_default || detail.sprites.front_default,
              types: detail.types.map((t) => t.type.name),
              stats: detail.stats,
            }))
        );

        Promise.all(fetchDetails).then((pokemonDetails) => {
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
      const isFavorite = prevFavorites.some((fav) => fav.id === pokemon.id);
      if (isFavorite) {
        const newFavorites = prevFavorites.filter((fav) => fav.id !== pokemon.id);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        return newFavorites;
      } else {
        const newFavorites = [...prevFavorites, pokemon];
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        return newFavorites;
      }
    });
  };

  const isFavorite = (pokemon) => {
    return favorites.some((fav) => fav.id === pokemon.id);
  };

  return (
    <PokemonContext.Provider
      value={{
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
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
