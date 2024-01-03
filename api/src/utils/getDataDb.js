const getDataDb = (data) => {
   const formattedDbPokemons = data.map((pokemon) => ({
     id: pokemon.id,
     name: pokemon.name,
     image: pokemon.image,
     healthPoints: pokemon.life,
     attack: pokemon.attack,
     defense: pokemon.defense,
     speed: pokemon.speed,
     height: pokemon.height,
     weight: pokemon.weight,
     types: pokemon.types.map((type) => type.name),
   }));
 
   return formattedDbPokemons;
 };
 
 module.exports = getDataDb;