require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const axios = require("axios"); 
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// We read all the files from the Models folder, request them and add them to the modelDefiners array
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// We inject the connection (sequelize) to all the models
modelDefiners.forEach((model) => model(sequelize));
// We capitalize the model names ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);


const { Pokemons, Type } = sequelize.models;

// Funtion to get Types from API
const initializeTypes = async () => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/type/");
    const typesFromAPI = response.data.results;

    for (const typeFromAPI of typesFromAPI) {
      await Type.findOrCreate({
        where: { name: typeFromAPI.name },
        defaults: { name: typeFromAPI.name },
      });
    }
    console.log("Tipos inicializados correctamente");
  } catch (error) {
    console.error("Error al inicializar tipos:", error);
  }
};


Pokemons.belongsToMany(Type, { through: "pokemon_type" });
Type.belongsToMany(Pokemons, { through: "pokemon_type" });

module.exports = {
  Pokemons,
  Type, 
  conn: sequelize,
  initializeTypes, // para importart la conexión { conn } = require('./db.js');
};
