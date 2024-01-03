const getPokemonByType = require("../controllers/getPokemonByType");

const getPokemonByTypeHandler = async (req, res) => {
  try {
    const types = await getPokemonByType();
    res.status(200).json(types);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = getPokemonByTypeHandler;