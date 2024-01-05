const getPokemonsById = require("../controllers/getPokemonById");

const getPokemonsHandler = async (req, res) => { 

   const { id } = req.params;

   try {
      const getPokemonById = await getPokemonsById(id);
      res.status(200).json(getPokemonById);
   }
   catch (error) {
      res.status(500).send(error.message);
   }
};

module.exports = getPokemonsHandler;