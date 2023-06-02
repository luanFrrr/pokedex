const htmlPokemonsList = document.querySelector("#pokemonList");
const loadMoreButton = document.querySelector("#loadMoreButton");
const popup = document.querySelector("#popup");

let offset = 0;
let limit = 12;
let maxRecords = 151;

function loadPokemons(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHTML = pokemons
      .map(
        (pokemon) =>
          `<li class="pokemon ${pokemon.type}" onclick="pokemonPopup('${
            pokemon.url
          }')" >
            <span class="pokemon__number">#${String(pokemon.id).padStart(
              3,
              "0"
            )}</span>
            <span class="pokemon__name">${pokemon.name}</span>
            <div class="pokemon__details">
              <ol class="pokemon__details__types">
                ${pokemon.types
                  .map(
                    (type) =>
                      `<li class="pokemon__details__type ${type}">${type}</li>`
                  )
                  .join("")}
              </ol>
              <img
                class="pokemon__image"
                src="${pokemon.sprite}"
                alt="${pokemon.name}"
              />
            </div>
          </li>`
      )
      .join("");
    htmlPokemonsList.innerHTML += newHTML;
  });
}

loadPokemons(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const nextPageRecordQuantity = offset + limit;
  if (nextPageRecordQuantity > maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemons(offset, newLimit);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemons(offset, limit);
  }
});

async function pokemonPopup(pokemonURL) {
  const pokemon = await pokeApi.getPokemonDetail({ url: pokemonURL });
  console.log(pokemon);
  const popupHTML = `<div class="pokemon-popup pokemon ${pokemon.type}">
          
          <div class="pokemon__details">
            <h1 class="pokemon__name">${pokemon.name}</h1>
            <ol class="pokemon__details__types">
            ${pokemon.types
              .map(
                (type) =>
                  `<li class="pokemon__details__type ${type}">${type}</li>`
              )
              .join("")}
            </ol>
          </div>
          <img
                class="pokemon__image"
                src="${pokemon.sprite}"
                alt="${pokemon.name}"
              />
          <div class="pokemon__data">
            <div class="pokemon__data__row">
              <span class="pokemon__data__row__title">Habilidades</span>
              <span class="pokemon__data__row__data">${pokemon.abilities.map(
                (abilitySlot) => abilitySlot.ability.name
              )}</span>
            </div>
            <div class="pokemon__data__row">
              <span class="pokemon__data__row__title">Peso</span>
              <span class="pokemon__data__row__data">${pokemon.weight}</span>
            </div>
          </div>
          <button class="closeButton" onclick="closePopup()">x</button>
        </div>`;

  popup.innerHTML = popupHTML;
}

function closePopup() {
  popup.innerHTML = "";
}
