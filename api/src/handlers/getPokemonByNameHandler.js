const getPokemonByName = require("../controllers/getPokemonByName");

const getPokemonByNameHandler = async (req, res) => { 

   let {name} = req.query; 

   console.log('Name recibido', name); //Recibe name ok
   
   try {
      const pokemonByName = await getPokemonByName(name);
      res.status(200).json(pokemonByName);
   }
   catch (error) {
      res.status(500).send(`Internal Server Error: ${error.message}`);
   }
};

module.exports = getPokemonByNameHandler;