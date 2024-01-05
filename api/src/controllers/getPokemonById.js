const axios = require("axios");
const getDataApi = require("../utils/getDataApi");
const getDataDb =require("../utils/getDataDb")
const { Pokemons, Type } = require("../db.js");


const getPokemonById = async (id) => {
  
   const URL = "https://pokeapi.co/api/v2/pokemon/";

try {

   //* From API
   if (!isNaN(id)){ 
      const {data} = await axios(`${URL}/${id}`);
      const standardizedPokemonApi = await getDataApi(data);
      return standardizedPokemonApi;
   };

   //  //* From DDBB
   if (isNaN(id)){ 
      
   };

} catch (error) {
   console.error("Error: ",error.message);
   throw error;
}
};

module.exports = getPokemonById;