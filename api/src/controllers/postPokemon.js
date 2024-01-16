const { Pokemons, Type } = require("../db.js");
const axios = require ('axios')

const URL = "https://pokeapi.co/api/v2/pokemon/";

const postPokemon = async ({ name, image, life, attack, defense, speed, height, weight, types }) => {

  const existingPokemon = await Pokemons.findOne({ where: { name: name } });
  
  if(existingPokemon){throw Error ('Pokemon with this name already exists')}


  try {
    const response = await axios.get(`${URL}${name.toLowerCase()}`);
    if (response.data) {
      throw Error("Pokemon with this name already exists");
    }
  } catch (error) {
    if (error.response && error.response.status !== 404) {
      throw error;
    }
  }

  console.log('como llega types', types);
    
  let typesInstances = [];
    
   for (let typeName of types) {
     let typeInstance = await Type.findOrCreate({ where: { name: typeName } });
     typesInstances.push(typeInstance[0]);
   }

   let newPokemon = await Pokemons.create({
    name,
    image,
    life,
    attack,
    defense,
    speed: speed || null, // Asignar null si no está presente
    height: height || null, // Asignar null si no está presente
    weight: weight || null, // Asignar null si no está presente
  });

    await newPokemon.setTypes(typesInstances);

    return newPokemon;
 
};

module.exports = postPokemon;