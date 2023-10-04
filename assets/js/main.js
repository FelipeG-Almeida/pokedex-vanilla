function pokemonCard(pokemon) {
	console.log(pokemon.types);

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

	return `
        <li class="pokemon" style="background-color: ${
			colours[pokemon.type]
		};" onmouseover="this.style.boxShadow='${
		colours[pokemon.type]
	} 0px 8px 24px'" onmouseout="this.style.boxShadow='none'"">
            <span class="number">#${pokemon.number
				.toString()
				.padStart(3, '0')}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
						.map(
							(type) =>
								`<li class="type" style="background-color: ${
									colours[pokemon.type]
								};">${type}</li>`
						)
						.join('')}
                </ol>
                <img
                    src="${pokemon.picture}"
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
