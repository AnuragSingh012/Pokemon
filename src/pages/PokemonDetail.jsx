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
    <div className="min-h-screen bg-white px-4 py-8 font-sans max-w-3xl mx-auto">
      <Link to="/" className="text-indigo-600 font-semibold mb-4 inline-block">← Back to Pokédex</Link>
      <div className="bg-indigo-50 rounded-3xl shadow-xl p-6">
        <div className="flex items-center gap-6">
          <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} className="w-40 h-40" />
          <div>
            <h2 className="text-4xl font-bold capitalize">{pokemon.name}</h2>
            <p className="text-gray-600">ID: #{pokemon.id}</p>
            <p className="mt-2">
              Types: {pokemon.types.map(t => t.type.name).join(', ')}
            </p>
            <p>
              Abilities: {pokemon.abilities.map(a => a.ability.name).join(', ')}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-2">Stats</h3>
          <ul className="grid grid-cols-2 gap-2">
            {pokemon.stats.map(stat => (
              <li key={stat.stat.name} className="text-gray-700">
                {stat.stat.name.toUpperCase()}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-2">Moves (Top 5)</h3>
          <ul className="list-disc list-inside text-gray-700">
            {pokemon.moves.slice(0, 5).map(m => (
              <li key={m.move.name}>{m.move.name}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-2">Evolution Chain</h3>
          <p className="text-gray-700 capitalize">{evolution.join(' → ')}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
