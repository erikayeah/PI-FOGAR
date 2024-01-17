const getPokemonByName = require("../controllers/getPokemonByName");

const getPokemonByNameHandler = async (req, res) => {
  let { name } = req.query;

  try {
    const pokemonByName = await getPokemonByName(name);

    res.status(200).json(pokemonByName);
  } catch (error) {
    console.error("Server error:", error.message);
    res.status(404).send(`There is no pokemon with the name ${name}`);
  }
};

module.exports = getPokemonByNameHandler;
