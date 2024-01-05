const postPokemon = require ("../controllers/postPokemon");
const { Pokemons, Type } = require("../db.js");

//* Require data: name, image, life, attack, defense, type
//* Optional data: speed, height, weighth


const getPokemonsHandler = async (req, res) => { 

   const { name, image, life, attack, defense, speed, height, weight, types } = req.body;

   try {

   const newPokemon = await postPokemon({name,image,life,attack,defense,speed,height,weight,types});

   const createdPokemon = await Pokemons.findByPk(newPokemon.dataValues.id, {
      include: Type,
    });
    

     console.log('se creo ', newPokemon);
 
     const filteredType = {
       ...createdPokemon.toJSON(),
       types: createdPokemon.types.map((type) => type.name),
     };
 
     res.status(200).json(filteredType);

   } catch (error) {
      console.log("Error:", error);
      if (error.message === `${name} already exists`) {
        res.status(400).send(error.message);
      } else {
        res.status(500).send(error.message);
      }
 };
}

module.exports = getPokemonsHandler;