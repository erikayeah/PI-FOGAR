const getDataDb = (data) => {
  
   const dbPokemons = data.map((pokemon) => ({
     id: pokemon.id,
     name: pokemon.name,
     image: pokemon.image,
     healthPoints: pokemon.life,
     attack: pokemon.attack,
     defense: pokemon.defense,
     speed: pokemon.speed,
     height: pokemon.height,
     weight: pokemon.weight,
     types: pokemon.types.map((type) => type.name) // [ type, type ]
   }));
 
   return dbPokemons;
 };
 
 module.exports = getDataDb;