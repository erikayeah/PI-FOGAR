const { Router } = require("express");
const pokeApi = require("../services/pokeApi");

const router = Router();

router.get("/pokemons", async (req, res) => {
  try {
    const pokemons = await pokeApi.getAllPokemons();
    res.json(pokemons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/pokemons/name", async (req, res) => {
  try {
    const pokemon = await pokeApi.getPokemonByName(req.query.name);
    res.json(pokemon);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/pokemons/:id", async (req, res) => {
  try {
    const pokemon = await pokeApi.getPokemonById(req.params.id);
    res.json(pokemon);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/types", async (req, res) => {
  try {
    const types = await pokeApi.getTypes();
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
