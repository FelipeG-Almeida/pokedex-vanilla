async function loadPokemonDetails() {
	const urlParams = new URLSearchParams(window.location.search);
	const pokemonId = parseInt(urlParams.get('id'));

	try {
		const pokemon = await pokeApi.getSinglePokemon(pokemonId);

		document.getElementById('pokemon-name').textContent = pokemon.name;
		document.getElementById('pokemon-img').src = pokemon.picture;
	} catch (error) {
		console.error('Erro ao carregar detalhes do Pokémon:', error);
	}
}

loadPokemonDetails();
