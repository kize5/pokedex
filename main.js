const poke_container = document.getElementById('poke_container');
const pokerand_container = document.getElementById('pokerand_container');
let isEmpty = document.getElementById('pokerand_container').innerHTML === "";
let fromBtn = false;
const pokemons_number = 151;
const pokemons_team = 6;
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
};

const main_types = Object.keys(colors);

// Prépare l'id à envoyer pour aller fetch dans l'api au bon numéro de pokemon
// + vérifie si le container pour la team est vide ou pas, si ce n'est pas le cas le vide
const fetchPokemons = async () => {
    if (fromBtn) {
        if (!isEmpty) {
            document.getElementById("pokerand_container").innerHTML = "";
        }
        for (let i = 1; i <= pokemons_team; i++) {
            let rand = Math.floor(Math.random() * 151);
            await getPokemon(rand)
        }
    } else {
        for (let i = 1; i <= pokemons_number; i++) {
            await getPokemon(i);
        }
    }
}
// Vérifie si l'appel de la fonction vient de l'appuie du button team ou non, si oui, go true
function fromBtnCheck() {
    fromBtn = true;
}
// Va fetch la pokeapi
const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    createPokemonCard(pokemon);
}

fetchPokemons();

// créer les éléments pour afficher le HTML sur la page via les données reçu par l'API
function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const poke_types = pokemon.types.map(el => el.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1)
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const img = pokemon.sprites.front_default;

    pokemonEl.style.backgroundColor = colors[type];

    pokemonEl.innerHTML = `
        <div class="img-container">
            <img src="${img}" alt="pokemon"/>
        </div>
        <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type : <span>${type}</span></small>
        </div>
        
    `;
    if (fromBtn) {
        pokerand_container.appendChild(pokemonEl);
    } else
        poke_container.appendChild(pokemonEl);
}