const axios = require("axios");
const getDataApi = require("../utils/getDataApi");
const { Op } = require("sequelize");
const { Pokemons, Type } = require("../db.js");

const URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokemonByName = async (name) => {
  
  try {
    if (!name) {
      throw Error("Error: Name not defined");
    }

    const nameLowerCase = name.toLowerCase();

    //* API
    const { data } = await axios.get(`${URL}/${nameLowerCase}`);

    if (data) {
       const filteredDataApi = await getDataApi(data);
       return filteredDataApi;
    }
    
    //* DDBB
    //CODIGO PARA BUSCAR EN MI BASE DE DATOS
    const pokemonNameDb = await Pokemons.findAll({
      where: {
        name: {
          [Op.iLike]: `%${lowerCase}%`,
        },
      },
      include: [Type],
    });
    return pokemonNameDb;



  } catch (error) {
    console.error("Error: ", error.message);
    throw error;
  }
};

module.exports = getPokemonByName;
