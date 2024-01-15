// updatePokemonHandler.js
const { putPokemon } = require('../controllers/putPokemon'); // Asegúrate de importar tu función de controlador

const putPokemonHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    console.log('id en habnlder', id);
    console.log('body en hanlder', updatedData);

    const updatedPokemon = await putPokemon(id, updatedData); // Puedes pasar los datos actualizados en el cuerpo de la solicitud
    res.status(200).json(updatedPokemon);
  } catch (error) {
    next(error);
  }
};

module.exports = putPokemonHandler;
