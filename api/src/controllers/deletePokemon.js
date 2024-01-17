const { Pokemons } = require("../db");

const deletePokemonController = async (id) => {
  try {
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const deletedPokemon = await Pokemons.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error("Error: ", error.message);
    throw error;
  }
};

module.exports = deletePokemonController;
