const { Router } = require('express');
//* Importar todos los routers;
const getPokemonsHandler = require("../handlers/getPokemonsHandler");
//Descomentar a medida que las completo
// const getPokemonByIdHandler = require("../handlers/getPokemonByIdHandler");
// const getPokemonByTypeHandler = require("../handlers/getPokemonByTypeHandler");
// const getPokemonByNameHandler = require("../handlers/getPokemonByNameHandler");
// const postPokemonHandler = require("../handlers/postPokemonHandler");


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

router.get("/", getPokemonsHandler); // Obtiene un arreglo de objetos, donde cada objeto es un pokemon con su información.

//*Descomentar a medida que las completo
// router.get("/:idPokemon", getPokemonByIdHandler); // Obtiene info de un pokemon especifico, ID llega por parametro.

// router.get("/name", getPokemonByNameHandler); // Esta ruta debe obtener todos aquellos que coinciden con el nombre recibido por query.

// router.get("/type", getPokemonByTypeHandler);

// router.post("/", postPokemonHandler); //Esta ruta recibirá todos los datos necesarios para crear un pokemon y relacionarlo con sus tipos solicitados.


module.exports = router;
