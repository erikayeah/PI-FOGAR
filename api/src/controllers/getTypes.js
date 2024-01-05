const axios = require("axios");
const { Type } = require("../db.js");

const URL = "https://pokeapi.co/api/v2/type/";

const getTypes = async () => {


   const {data } = await axios.get(`${URL}`);

   const {results} = data; // restuls = [ { "name": "typeName", "url": "urllllll"}, { "name": "typeName", "url": "urllllll"},  ]

   for (let typeData of results) {
     const typeName = typeData.name;
     
     const allType = await Type.findAll({ where: { name: typeName } });
 
     if (allType.length === 0) {
       await Type.create({ name: typeName });
     }
   }
 
   return Type.findAll();
 };
module.exports = getTypes;