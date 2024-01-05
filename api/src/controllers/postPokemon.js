const { Pokemons, Type } = require('../db.js');

const postPokemon = async ({name, image, life, attack, defense, speed, height, weight, types}) => {

  try {
    // Verificar si el Pokémon ya existe
    const existingPokemon = await Pokemons.findOne({ where: { name: name } });

    if (existingPokemon) {
      return ( `${name} already exists`);
    }

    // Crear el Pokémon
    const newPokemon = await Pokemons.create({
      name,
      image,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
    });

    // Obtener o crear los tipos y relacionarlos con el Pokémon
    const typesInstances = await Promise.all(types.map(typeName => Type.findOrCreate({ where: { name: typeName } })));

    // Relacionar los tipos con el Pokémon
    await newPokemon.setTypes(typesInstances.map(type => type[0]));

    // Devolver la respuesta
  } catch (error) {
   console.error("Error: ",error.message);
   throw error;
}
};

module.exports = postPokemon;
