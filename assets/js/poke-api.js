const pokeApi = {};

function toPokemonModel(pokemonDetail) {
	const pokemon = new Pokemon();
	const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
	const [type] = types;

	pokemon.number = pokemonDetail.id;
	pokemon.name = pokemonDetail.name;
	pokemon.types = types;
	pokemon.type = type;
	pokemon.picture =
		pokemonDetail.sprites.other['official-artwork'].front_default;

	return pokemon;
}

pokeApi.getPokemonsDetails = (pokemon) => {
	return fetch(pokemon.url)
		.then((response) => response.json())
		.then(toPokemonModel);
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
