// pokemonController.js
const { Pokemons, Type } = require("../db");

const putPokemon = async (id, updatedData) => {
  try {
    const pokemonToUpdate = await Pokemons.findByPk(id);

    if (!pokemonToUpdate) {
      throw new Error("Pokemon not found");
    }

    if (Object.keys(updatedData).length === 0) {
      throw new Error("No data provided for update");
    }

    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key] === "") {
        updatedData[key] = null;
      }
    });

    // Update fields
    Object.assign(pokemonToUpdate, updatedData);

    if (updatedData.types && Array.isArray(updatedData.types)) {
      // Get the UUIDs of the corresponding types
      const typeUUIDs = await Type.findAll({
        where: { name: updatedData.types },
      });

      await pokemonToUpdate.setTypes([], { through: "pokemon_type" });

      await pokemonToUpdate.addTypes(typeUUIDs, { through: "pokemon_type" });
    }

    await pokemonToUpdate.save();

    return {
      success: true,
      message: "Pokemon updated successfully",
      updatedPokemon: pokemonToUpdate,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  putPokemon,
};
