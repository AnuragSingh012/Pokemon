import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const PokemonDetail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolution, setEvolution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await res.json();
        setPokemon(data);
        const speciesRes = await fetch(data.species.url);
        const speciesData = await speciesRes.json();
        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData = await evoRes.json();
        const chain = [];

        let current = evoData.chain;
        while (current) {
          chain.push(current.species.name);
          current = current.evolves_to[0];
        }

        setEvolution(chain);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [name]);

  if (loading) return <div className="text-center mt-20 text-xl">Loading...</div>;
  if (!pokemon) return <div className="text-center mt-20 text-red-500">Pokémon not found.</div>;

  return (
    <div className="min-h-screen px-4 py-8 font-sans max-w-3xl mx-auto">
      <Link to="/" className="text-indigo-600 font-semibold mb-6 inline-block hover:underline">
        ← Back to Pokédex
      </Link>

      <div className="bg-white rounded-3xl shadow-xl p-6 border border-indigo-100">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            className="w-40 h-40 md:w-48 md:h-48 object-contain mx-auto"
          />
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold capitalize text-indigo-700 mb-2">{pokemon.name}</h2>
            <p className="text-gray-500 text-lg">ID: #{pokemon.id}</p>
            <p className="mt-3 text-sm md:text-md">
              <span className="font-semibold">🌈 Types:</span>{' '}
              {pokemon.types.map(t => t.type.name).join(', ')}
            </p>
            <p className="text-sm md:text-md">
              <span className="font-semibold">✨ Abilities:</span>{' '}
              {pokemon.abilities.map(a => a.ability.name).join(', ')}
            </p>
          </div>
        </div>

        <div className="mt-8 bg-indigo-50 p-4 rounded-2xl">
          <h3 className="text-xl md:text-2xl font-bold text-indigo-700 mb-2">⚔️ Stats</h3>
          <ul className="grid grid-cols-2 gap-2 text-gray-800">
            {pokemon.stats.map(stat => (
              <li key={stat.stat.name} className="text-sm md:text-md">
                <span className="font-semibold">{stat.stat.name.toUpperCase()}:</span>{' '}
                {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 bg-pink-50 p-4 rounded-2xl">
          <h3 className="text-xl md:text-2xl font-bold text-pink-600 mb-2">🌀 Moves (Top 5)</h3>
          <ul className="list-disc list-inside text-gray-800 text-sm md:text-md">
            {pokemon.moves.slice(0, 5).map(m => (
              <li key={m.move.name}>{m.move.name}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 bg-yellow-50 p-4 rounded-2xl">
          <h3 className="text-xl md:text-2xl font-bold text-yellow-600 mb-2">🔄 Evolution Chain</h3>
          <p className="text-gray-800 text-sm md:text-lg capitalize">{evolution.join(' → ')}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
