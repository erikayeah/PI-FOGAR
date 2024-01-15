const getPokemonByName = require("../controllers/getPokemonByName");

const getPokemonByNameHandler = async (req, res) => { 

   let { name } = req.query;

  try {
    const pokemonByName = await getPokemonByName(name);

   //  if (!pokemonByName) {
   //    res.status(404).send(`No existe pokemon con el nombre ${name}`);
   //  } else {
      res.status(200).json(pokemonByName);
   //  }
  } catch (error) {
    console.error("Server error:", error);
    res.status(404).send(`There is no pokemon with the name ${name}`);
  }
};

module.exports = getPokemonByNameHandler;