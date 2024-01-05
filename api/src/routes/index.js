const { Router } = require('express');
//* Importar todos los routers;
const getPokemonsHandler = require("../handlers/getPokemonsHandler");
const getPokemonByNameHandler = require("../handlers/getPokemonByNameHandler");
const getPokemonByIdHandler = require("../handlers/getPokemonByIdHandler");
//Descomentar a medida que las completo
// const getPokemonByTypeHandler = require("../handlers/getPokemonByTypeHandler");
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
//* Descomentar a medida que las completo

router.get("/", getPokemonsHandler); // Obtiene un arreglo de objetos, donde cada objeto es un pokemon con su información.

//* Name primero que ID, porque si no, no funciona.
router.get("/name", getPokemonByNameHandler); // Esta ruta debe obtener todos aquellos que coinciden con el nombre recibido por query.

router.get("/:id", getPokemonByIdHandler); // Obtiene info de un pokemon especifico, ID llega por parametro.

// router.get("/type", getPokemonByTypeHandler);

router.post("/", postPokemonHandler); //Esta ruta recibirá todos los datos necesarios para crear un pokemon y relacionarlo con sus tipos solicitados.

router.use((req, res, next) => {
   const error = new Error('Route not found');
   error.status = 404;
   next(error);
});

module.exports = router;
