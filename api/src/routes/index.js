const { Router } = require('express');
//* Importar todos los routers;
const getPokemonsHandler = require("../handlers/getPokemonsHandler");
const getPokemonByNameHandler = require("../handlers/getPokemonByNameHandler");
const getPokemonByIdHandler = require("../handlers/getPokemonByIdHandler");
const getTypesHandler = require("../handlers/getTypesHandler");
const postPokemonHandler = require("../handlers/postPokemonHandler");


//* Ruta => llama al Handler

//* Handler
//* Recibir y desestructurar informacion
//* Invoca al controlador
//* Maneja el error

//* Controller
//* Comunicacion con el exterior (BBD o API externa)
//* Devolver informacion o un error


const router = Router();

// Configurar los routers
router.get("/", getPokemonsHandler); 
router.post("/", postPokemonHandler); 
router.get("/name", getPokemonByNameHandler);  
router.get("/type", getTypesHandler);
router.get("/:id", getPokemonByIdHandler); //* ID al final, si no las otras rutas no funcionan

router.use((req, res, next) => {
   const error = new Error('Route not found');
   error.status = 404;
   next(error);
});

module.exports = router;
