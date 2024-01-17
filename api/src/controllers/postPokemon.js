const { Pokemons, Type } = require("../db.js");
const axios = require("axios");

const URL = "https://pokeapi.co/api/v2/pokemon/";

const postPokemon = async ({
  name,
  image,
  life,
  attack,
  defense,
  speed,
  height,
  weight,
  types,
}) => {
  try {
    const existingPokemon = await Pokemons.findOne({
      where: { name: name.toLowerCase() },
    });

    if (existingPokemon) {
      throw new Error("Pokemon with this name already exists");
    }

    const response = await axios.get(`${URL}${name.toLowerCase()}`);
    if (response.data) {
      throw new Error("Pokemon with this name already exists");
    }
  } catch (error) {
    if (error.response && error.response.status !== 404) {
      throw error;
    }
  }

  let typesInstances = [];

  for (let typeName of types) {
    let typeInstance = await Type.findOrCreate({ where: { name: typeName } });
    typesInstances.push(typeInstance[0]);
  }

  let newPokemon = await Pokemons.create({
    name: name.toLowerCase(),
    image,
    life,
    attack,
    defense,
    speed: speed || null,
    height: height || null,
    weight: weight || null,
  });

  await newPokemon.setTypes(typesInstances);

  return newPokemon;
};

module.exports = postPokemon;
