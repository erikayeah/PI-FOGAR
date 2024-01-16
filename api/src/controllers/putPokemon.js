// pokemonController.js
const { Pokemons, Type } = require('../db');

const putPokemon = async (id, updatedData) => {
  try {
    const pokemonToUpdate = await Pokemons.findByPk(id);

    if (!pokemonToUpdate) {
      throw new Error('Pokemon not found');
    }

    // Validar y aplicar datos actualizados
    // Ejemplo: Validar que los datos no estén vacíos
    if (Object.keys(updatedData).length === 0) {
      throw new Error('No data provided for update');
    }

    // Convertir cadenas vacías a null
    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key] === '') {
        updatedData[key] = null;
      }
    });

    // Actualizar los campos según los datos proporcionados
    Object.assign(pokemonToUpdate, updatedData);

    // Manejar la relación de muchos a muchos
    if (updatedData.types && Array.isArray(updatedData.types)) {
      // Obtener los UUIDs de los tipos correspondientes
      const typeUUIDs = await Type.findAll({
        where: { name: updatedData.types }
      });

      // Limpiar tipos existentes para el Pokémon
      await pokemonToUpdate.setTypes([], { through: 'pokemon_type' });

      // Agregar los nuevos tipos
      await pokemonToUpdate.addTypes(typeUUIDs, { through: 'pokemon_type' });
    }

    // Guardar cambios en la base de datos
    await pokemonToUpdate.save();

    // Puedes personalizar la respuesta según tus necesidades
    return {
      success: true,
      message: 'Pokemon updated successfully',
      updatedPokemon: pokemonToUpdate,
    };
  } catch (error) {
    // Manejar errores específicos si es necesario
    throw error;
  }
};

module.exports = {
  putPokemon,
};
