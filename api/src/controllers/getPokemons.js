const axios = require("axios");
const { Pokemons, Type } = require("../db");
const getDataApi = require("../utils/getDataApi");
const getDataDb = require("../utils/getDataDb");

const URL = "https://pokeapi.co/api/v2/pokemon/";
const limit = 30;
let endpoint = URL;

const getPokemons = async () => {
  let apiPokemonsUrl = [];
  try {
    //* From API
    while (apiPokemonsUrl.length < limit) {
      const { data } = await axios.get(endpoint);
      apiPokemonsUrl.push(...data.results); // restuls: [{name : 'name'}, {url: 'data'}]

      endpoint = data.next;
    }
    endpoint = URL;

    const pokemonDataPromises = apiPokemonsUrl.map((poke) =>
      axios // Map every element in apiPokemonUrl. This is an [] of promises. Each promise is the data of one Pokemon from the API.
        .get(poke.url)
        .then((res) => getDataApi(res.data))
        .catch((error) => error.message)
    );

    const apiListPokemons = await Promise.all(pokemonDataPromises);

    //* From DDBB
    const dbPokemons = await Pokemons.findAll({ include: Type });
    const dbFilteredPokemons = getDataDb(dbPokemons);

    //* API + DDBB
    const allPokemons = [...dbFilteredPokemons, ...apiListPokemons];
    return allPokemons;
  } catch (error) {
    console.error("Error: ", error.message);
    throw error;
  }
};

module.exports = getPokemons;
