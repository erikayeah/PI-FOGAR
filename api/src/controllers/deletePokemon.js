// controllers/deletePokemonController.js
const { Pokemons } = require('../db');

const deletePokemonController = async (id) => {
   try {
  
      if (!id) {
        // Si no hay un ID en los parámetros, devuelve un error 400 (Bad Request)
        return res.status(400).json({ error: 'ID is required' });
      }
  
      // Utiliza el método destroy de Sequelize para eliminar el Pokémon por ID
      const deletedPokemon = await Pokemons.destroy({
        where: {
          id: id,
        },
      });
  

  } catch (error) {
   console.error("Error: ",error.message);
   throw error;
}
};

module.exports = deletePokemonController;
