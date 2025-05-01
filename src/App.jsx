import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PokemonProvider } from './context/PokemonContext';
import HomePage from './pages/HomePage';
import PokemonDetail from './pages/PokemonDetail';
import FavoritesPage from './pages/FavoritesPage';
import PokemonComparisonPage from './pages/PokemonComparisonPage';

const App = () => (
  <PokemonProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/compare" element={<PokemonComparisonPage />} />
      </Routes>
    </Router>
  </PokemonProvider>
);

export default App;
