const axios = require("axios");
const getDataApi = require("../utils/getDataApi");
const { Op } = require("sequelize");
const { Pokemons, Type } = require("../db.js");

const URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokemonByName = async (name) => {
  
  if (name.length === 0) {
    throw Error("Error name not defined");
  }

    const lowerCase = name.toLowerCase();

    const localPokemons = await Pokemons.findAll({
      where: {
        name: {
          [Op.iLike]: `%${lowerCase}%`,
        },
      },
      include: [Type],
    });

    if (localPokemons && localPokemons.length > 0) {
      return localPokemons;
    } else {
      const getPokemonByName = await axios(`${URL}${lowerCase}`);
      const data = getPokemonByName.data;
      const filteredData = await getData(data);

      return filteredData;
    }
 
};

module.exports = getPokemonByName;
