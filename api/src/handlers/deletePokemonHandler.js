const deletePokemon = require("../controllers/deletePokemon");

const deletePokemonHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const pokemons = await deletePokemon(id);
    res.status(200).json({ message: "Pokemon deleted successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = deletePokemonHandler;
