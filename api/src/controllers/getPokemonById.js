const axios = require("axios");
const getDataApi = require("../utils/getDataApi");
const { Pokemons, Type } = require("../db.js");

const getPokemonById = async (id) => {
  const URL = "https://pokeapi.co/api/v2/pokemon/";
  let localPokemon;

  //* From API
  if (!isNaN(id)) {
    const { data } = await axios(`${URL}/${id}`);
    const standardizedPokemonApi = await getDataApi(data);
    return standardizedPokemonApi;
  }

  //* From DDBB
  else {
    localPokemon = await Pokemons.findOne({ where: { id: id }, include: Type });

    if (localPokemon) {
      const localPokemonJSON = localPokemon.toJSON();
      localPokemonJSON.types = localPokemon.types.map((type) => type.name);
      return localPokemonJSON;
    }
  }

  throw Error("Pokemon not found");
};

module.exports = getPokemonById;
