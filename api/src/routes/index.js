const { Router } = require("express");
const { initializeTypes } = require("../db"); // 
// Hanlders;
const getPokemonsHandler = require("../handlers/getPokemonsHandler");
const getPokemonByNameHandler = require("../handlers/getPokemonByNameHandler");
const getPokemonByIdHandler = require("../handlers/getPokemonByIdHandler");
const getTypesHandler = require("../handlers/getTypesHandler");
const postPokemonHandler = require("../handlers/postPokemonHandler");

const deletePokemonHandler = require("../handlers/deletePokemonHandler");
const putPokemonHandler = require("../handlers/putPokemonHandler");

//* Ruta => llama al Handler

//* Handler
//* Recibir y desestructurar informacion
//* Invoca al controlador
//* Maneja el error

//* Controller
//* Comunicacion con el exterior (BBD o API externa)
//* Devolver informacion o un error

const router = Router();

initializeTypes();

router.get("/", getPokemonsHandler);
router.post("/post", postPokemonHandler);
router.get("/name", getPokemonByNameHandler);
router.get("/type", getTypesHandler);

router.delete("/delete/:id", deletePokemonHandler);
router.put("/put/:id", putPokemonHandler);
router.get("/:id", getPokemonByIdHandler); 

router.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

module.exports = router;
