/* Creating a variable called poke_container and assigning it to the element with the id of
poke-container. It is also creating a variable called pokemon_count and assigning it to the number
1015. It is also creating a variable called colors and assigning it to an object with different
colors. */
const poke_container = document.getElementById("poke-container");
const pokemon_count = 1015;
const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

/* Creating a variable called main_types and assigning it to the keys of the colors object. */
const main_types = Object.keys(colors);

/**
 * It loops through the number of pokemon and calls the getPokemon function for each one.
 */
const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i);
  }
};

/**
 * It takes an id, makes a request to the PokeAPI, and then creates a card with the data it receives.
 * @param id - the id of the pokemon you want to get
 */
const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPokemonCard(data, id);
};

/**
 * It creates a div element, adds a class to it, and then adds some HTML to it
 * @param pokemon - the pokemon object
 * @param id - The id of the pokemon
 */
const createPokemonCard = (pokemon, id) => {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");

  const dexID = pokemon.id.toString().padStart(3, "0");

  const poke_types = pokemon.types.map((type) => type.type.name).join("/");
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
  const color = colors[type];

  pokemonEl.style.backgroundColor = color;

  const pokemonInnerHTML = `
    <div class="img-container">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"
        alt="${pokemon.name}"
      />
    </div>
    <div class="info">
      <span class="number">#${dexID}</span>
      <h3 class="name">${pokemon.name}</h3>
      <small class="type">
        Type:
        <span>${type}</span>
      </small>
    </div>
  `;

  pokemonEl.innerHTML = pokemonInnerHTML;

  poke_container.appendChild(pokemonEl);
};

/* Looping through the number of pokemon and calling the getPokemon function for each one. */
fetchPokemons();

/* Creating a variable called searchInput and assigning it to the element with the id of search-input.
It is also adding an event listener to the searchInput variable. It is also creating a variable
called filterValue and assigning it to the value of the searchInput variable. It is also creating a
variable called pokemonCards and assigning it to the elements with the class of pokemon. It is also
looping through the pokemonCards variable and creating a variable called name and assigning it to
the text content of the element with the class of name. It is also checking if the name variable
includes the filterValue variable. If it does, it is setting the display of the card variable to
block. If it doesn't, it is setting the display of the card variable to none. */
const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", () => {
  const filterValue = searchInput.value.trim().toLowerCase();
  const pokemonCards = document.querySelectorAll(".pokemon");

  pokemonCards.forEach((card) => {
    const name = card.querySelector(".name").textContent.toLowerCase();

    if (name.includes(filterValue)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
