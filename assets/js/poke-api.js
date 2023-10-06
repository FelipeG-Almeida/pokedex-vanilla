const pokeApi = {};

function toPokemonModel(pokemonDetail) {
	const pokemon = new Pokemon();
	const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
	const [type] = types;
	const abilities = pokemonDetail.abilities.map(
		(abilitieSlot) =>
			abilitieSlot.ability.name.charAt(0).toUpperCase() +
			abilitieSlot.ability.name.slice(1)
	);
	const stats = pokemonDetail.stats.map((slot) => {
		return (stat = {
			name: slot.stat.name,
			value: slot.base_stat,
		});
	});

	const frontSprite =
		pokemonDetail.sprites.versions['generation-v']['black-white']?.animated
			?.front_default;
	const backSprite =
		pokemonDetail.sprites.versions['generation-v']['black-white']?.animated
			?.back_default;

	pokemon.number = pokemonDetail.id;
	pokemon.name = pokemonDetail.name;
	pokemon.types = types;
	pokemon.type = type;
	pokemon.picture =
		pokemonDetail.sprites.other['official-artwork'].front_default;
	pokemon.height = pokemonDetail.height;
	pokemon.weight = pokemonDetail.weight;
	pokemon.abilities = abilities.join(', ');
	pokemon.stats = stats;
	pokemon.frontSprite = frontSprite;
	pokemon.backSprite = backSprite;

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

pokeApi.getSinglePokemon = async (id) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

	try {
		const response = await fetch(url);
		const data = await response.json();
		return toPokemonModel(data);
	} catch (error) {
		console.log(error);
	}
};
