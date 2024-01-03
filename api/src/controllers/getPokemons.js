// getPokemons.js
// Obtiene un arreglo de objetos, donde cada objeto es un pokemon con su información.
// { [], [], [] };

const axios = require("axios");
const { Pokemons, Type } = require("../db");
const getDataApi = require("../utils/getDataApi");
const getDataDb = require("../utils/getDataDb");


const urlApi = "https://pokeapi.co/api/v2/pokemon/";
const urlEndpoint = urlApi;

const getPokemons = async () => {

   
   try { 
      
      let apiPokemons = [];

      //API

      while (apiPokemons.length < 40) { //while less than 40, get pokemons.
         const res = await axios.get(urlEndpoint);
         apiPokemons.push(...res.data.results); // restuls: [{name : 'name'}, {url: 'URL'}] => url has the pokemons'data. 
         urlEndpoint = res.data.next; // Move to the next page
      }

      const pokemonDataPromises = apiPokemons.slice(0, 40).map((poke) => axios
      .get(poke.url)
      .then((res) => getDataApi(res.data)));
      const allApiPokemons = await Promise.all (pokemonDataPromises);
       
      // const pokemonDataUrl = apiPokemons.slice(0, 40).map((pokemon) => axios.get(pokemon.url));
      // const pokemonAllPromises = await Promise.all(pokemonDataUrl); //await all the primises are completed.
      // const allApiPokemons = await Promise.all (
      // pokemonAllPromises.map ((res) => getDataApi(res.data))
      // );
      
      //DDBB

      const dbPokemons = await Pokemons.findAll({ include: Type }); //Get from DB.
      const dbFilteredPokemons = getDataDb(dbPokemons);


      const allPokemons = [ ...dbFilteredPokemons, ...allApiPokemons] // All pokemons together
      return allPokemons;

   } catch (error) {
      res.status(500).send(error.message)
   }


};

module.exports = getPokemons
