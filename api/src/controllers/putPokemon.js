// pokemonController.js
const { Pokemons}  = require('../db');

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

    // Actualizar los campos según los datos proporcionados
    Object.assign(pokemonToUpdate, updatedData);

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
