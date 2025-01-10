const axios = require("axios");

const BASE_URL = "https://pokeapi.co/api/v2";

const formatPokemonData = (data) => {
  return {
    id: data.id,
    name: data.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${data.id}.gif`,
    types: data.types.map((type) => type.type.name),
    life: data.stats.find((stat) => stat.stat.name === "hp").base_stat,
    attack: data.stats.find((stat) => stat.stat.name === "attack").base_stat,
    defense: data.stats.find((stat) => stat.stat.name === "defense").base_stat,
    speed: data.stats.find((stat) => stat.stat.name === "speed").base_stat,
    height: data.height,
    weight: data.weight,
  };
};

const pokeApi = {
  async getAllPokemons(limit = 30) {
    try {
      const { data } = await axios.get(`${BASE_URL}/pokemon?limit=${limit}`);
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const { data: details } = await axios.get(pokemon.url);
          return formatPokemonData(details);
        })
      );
      return pokemonDetails;
    } catch (error) {
      throw new Error("Error fetching pokemons");
    }
  },

  async getPokemonById(id) {
    try {
      const { data } = await axios.get(`${BASE_URL}/pokemon/${id}`);
      return formatPokemonData(data);
    } catch (error) {
      throw new Error("Pokemon not found");
    }
  },

  async getPokemonByName(name) {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/pokemon/${name.toLowerCase()}`
      );
      return formatPokemonData(data);
    } catch (error) {
      throw new Error(`Pokemon ${name} not found`);
    }
  },

  async getTypes() {
    try {
      const { data } = await axios.get(`${BASE_URL}/type`);
      return data.results.map((type) => ({
        name: type.name,
      }));
    } catch (error) {
      throw new Error("Error fetching types");
    }
  },
};

module.exports = pokeApi;
