class Pokemon {
  name;
  id;
  sprite;
  type;
  types = [];
  url;
  abilities = [];
  weight;

  constructor(pokemon) {
    this.name = pokemon.name;
    this.id = pokemon.id;
    this.sprite = pokemon.sprites.other.dream_world.front_default;
    this.types = pokemon.types.map((typeSlot) => typeSlot.type.name);
    this.type = this.types[0];
    this.url = `https://pokeapi.co/api/v2/pokemon/${this.id}`;
    this.abilities = pokemon.abilities;
    this.weight = pokemon.weight;
  }
}
