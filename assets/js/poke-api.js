const pokeApi = {};

pokeApi.getPokemonsDetails = (pokemon) => {
	return fetch(pokemon.url).then((response) => response.json());
};

pokeApi.getPokemons = (offset = 0, limit = 12) => {
	const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

	return fetch(url)
		.then((response) => response.json())
		.then((jsonBody) => jsonBody.results)
		.then((pokemons) => pokemons.map(pokeApi.getPokemonsDetails))
		.then((detailsRequest) => Promise.all(detailsRequest))
		.then((pokemonDetails) => pokemonDetails);
};