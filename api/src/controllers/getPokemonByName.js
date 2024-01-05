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

    const dbPokemon = await Pokemons.findAll({ // return an [].
      where: {
        name: {
          [Op.iLike]: `%${lowerCase}%`,
        },
      },
      include: [Type],
    });

    if (dbPokemon && dbPokemon.length > 0) {
      return dbPokemon;
    } else {
      const {data} = await axios(`${URL}/${lowerCase}`);
      const filteredData = await getData(data);

      return filteredData;
    }
 
};

/* With Promise 
  return new Promise((resolve, reject) => {
    if (name.length === 0) {
      reject(new Error("Error: Name not defined"));
    }

    const lowerCase = name.toLowerCase();

    Pokemons.findAll({
      where: {
        name: {
          [Op.iLike]: `%${lowerCase}%`,
        },
      },
      include: [Type],
    })
      .then((dbPokemon) => {
        if (dbPokemon && dbPokemon.length > 0) {
          resolve(dbPokemon);
        } else {
          axios.get(`${URL}/${lowerCase}`)
            .then(({ data }) => getDataApi(data))
            .then((filteredData) => resolve(filteredData))
            .catch((error) => reject(error));
        }
      })
      .catch((error) => reject(error));
  });
};
*/

module.exports = getPokemonByName;

