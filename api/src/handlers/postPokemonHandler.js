const postPokemon = require ("../controllers/postPokemon");
const { Pokemons, Type } = require("../db.js");

//* Require data: name, image, life, attack, defense, type
//* Optional data: speed, height, weighth


const getPokemonsHandler = async (req, res) => { 
  const { name, image, life, attack, defense, speed, height, weight, types } = req.body;

  // Asignar valores por defecto a los campos opcionales si no están presentes
  const newPokemonData = {
    name,
    image,
    life,
    attack,
    defense,
    speed: speed || null,
    height: height || null,
    weight: weight || null,
    types,
  };


  if (!name || !image || !life || !attack || !defense || !types) {
    console.log("Validation Error: Missing or invalid data");
    return res.status(400).send("Missing or invalid data");
  }

  try {
    const newPokemon = await postPokemon(newPokemonData);

    const createdPokemon = await Pokemons.findByPk(newPokemon.id, {
      include: Type,
    });

    const filteredType = {
      ...createdPokemon.toJSON(),
      types: createdPokemon.types.map((type) => type.name)
    };

    res.status(200).json({ filteredType, message: "Pokemon created successfully!" });

  } catch (error) {
    if (error.message === "Pokemon with this name already exists") {
      res.status(400).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};


module.exports = getPokemonsHandler;