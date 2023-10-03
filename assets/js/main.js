function pokemonCard(pokemon) {
	console.log(pokemon);

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

	const pokemonTypes = pokemon.types.map((slot) => {
		return `<li class="type" style="background-color: ${
			colours[pokemon.types[0].type.name]
		};">${slot.type.name}</li>`;
	});

	return `
        <li class="pokemon" style="background-color: ${
			colours[pokemon.types[0].type.name]
		};">
            <span class="number">#${pokemon.id
				.toString()
				.padStart(3, '0')}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemonTypes.join('')}
                </ol>
                <img
                    src="${
						pokemon.sprites.other['official-artwork'].front_default
					}"
                    alt="${pokemon.name}"/>
            </div>
        </li>`;
}

const pokemonHTML = document.getElementById('pokemons');

pokeApi
	.getPokemons()
	.then((pokemons) => {
		pokemonHTML.innerHTML += pokemons.map(pokemonCard).join('');
	})
	.catch((error) => console.log(error));
