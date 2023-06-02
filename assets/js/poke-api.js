const pokeApi = {
  getPokemonDetail: (pokemon) => {
    return fetch(pokemon.url)
      .then((response) => response.json())
      .then((pokemonDetail) => {
        return convertPokeApiDetailToPokemon(pokemonDetail);
      });
  },

  getPokemons: (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    return fetch(url)
      .then((response) => response.json())
      .then((json) => json.results)
      .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
      .then((detailRequests) => Promise.all(detailRequests))
      .catch((error) => console.error(error));
  },
};

function convertPokeApiDetailToPokemon(pokemonDetail) {
  const pokemon = new Pokemon(pokemonDetail);
  return pokemon;
}
