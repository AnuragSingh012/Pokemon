import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PokemonProvider } from './context/PokemonContext';
import HomePage from './pages/HomePage';
import PokemonDetail from './pages/PokemonDetail';

const App = () => (
  <PokemonProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </Router>
  </PokemonProvider>
);

export default App;
