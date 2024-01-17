const { putPokemon } = require("../controllers/putPokemon");

const putPokemonHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // console.log('id in handler', id);
    // console.log('body in handler', updatedData);

    const updatedPokemon = await putPokemon(id, updatedData);
    res.status(200).json(updatedPokemon);
  } catch (error) {
    next(error);
  }
};

module.exports = putPokemonHandler;
