const colours = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};

async function loadPokemonDetails() {
	const urlParams = new URLSearchParams(window.location.search);
	const pokemonId = parseInt(urlParams.get('id'));

	try {
		const pokemon = await pokeApi.getSinglePokemon(pokemonId);
		console.log(pokemon);

		const content = document.getElementsByClassName('content');
		content[0].style.backgroundColor = colours[pokemon.type];
		document.getElementById('pokemon-name').textContent = pokemon.name;
		document.getElementById('number').textContent =
			'#' + pokemon.number.toString().padStart(3, '0');
		document.getElementById('type1').textContent = pokemon.types[0];
		document.getElementById('type1').style.backgroundColor =
			colours[pokemon.type];
		if (pokemon.types[1]) {
			document.getElementById('type2').textContent = pokemon.types[1];
			document.getElementById('type2').style.backgroundColor =
				colours[pokemon.type];
		}
		document.getElementById('pokemon-img').src = pokemon.picture;
		document.getElementById('height').textContent = `${
			pokemon.height * 10
		} cm`;
		document.getElementById('weight').textContent = `${
			pokemon.weight / 10
		} kg`;
		document.getElementById('abilities').textContent = pokemon.abilities;
		document.getElementById('hp').textContent = pokemon.stats[0].value;
		document.getElementById('attack').textContent = pokemon.stats[1].value;
		document.getElementById('defense').textContent = pokemon.stats[2].value;
		document.getElementById('spAttack').textContent =
			pokemon.stats[3].value;
		document.getElementById('spDefense').textContent =
			pokemon.stats[4].value;
		document.getElementById('speed').textContent = pokemon.stats[5].value;
		document.getElementById('front_sprite').src = pokemon.frontSprite;
		document.getElementById('back_sprite').src = pokemon.backSprite;
	} catch (error) {
		console.error('Erro ao carregar detalhes do Pokémon:', error);
	}
}

loadPokemonDetails();
