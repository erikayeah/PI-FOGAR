// getPokemons.js
// Obtiene un arreglo de objetos, donde cada objeto es un pokemon con su información.
// [ {name, url}, {name, url}, {name, url} ] ;

const axios = require("axios");
const { Pokemons, Type } = require("../db");
const getDataApi = require("../utils/getDataApi");
const getDataDb = require("../utils/getDataDb");


const URL = "https://pokeapi.co/api/v2/pokemon/";
const limit = 100;
let endpoint = URL

const getPokemons = async () => {
   
   let apiPokemonsUrl = [];
   try {

      //* From API
      while (apiPokemonsUrl.length < limit) { //while less than 70, get pokemons.
         const { data } = await axios.get(endpoint);
         apiPokemonsUrl.push(...data.results); // restuls: [{name : 'name'}, {url: 'URL'}] => url has the pokemon's data. 
         //* In this case, data.results is an array of objects, where each object represents the basic information of a Pokémon. Using the spread operator extracts and adds those objects individually to the apiPokemonsUrl array.
         endpoint = data.next; // Move to the next page
      }
      endpoint = URL; // Reset endpoint 

      const pokemonDataPromises = apiPokemonsUrl.map((poke) => axios  // Map every element in apiPokemonUrl. This is an [] of promises. Each promise is the data of one Pokemon from the API.
      .get(poke.url) // Get the url prperty of each one.
      .then((res) => getDataApi(res.data)) // Standardize data with getDataApi
      .catch((error) => error.message));



      const apiListPokemons = await Promise.all (pokemonDataPromises); // Returns a new promise when all promises in pokemonDataPromises are resolved o rejected.
      // apiListPokemons = New array with the results.

      
      //* From DDBB
      const dbPokemons = await Pokemons.findAll({ include: Type }); //Get from DB.
      const dbFilteredPokemons = getDataDb(dbPokemons); //!Es necesario esto, si mi base de datos ya la tengo bien organizada?

      //* API + DDBB
      const allPokemons = [ ...dbFilteredPokemons, ...apiListPokemons] // Both [] together.
      return allPokemons;
      
   } catch (error) {
      console.error("Error: ",error.message);
      throw error;
   }
};

module.exports = getPokemons
