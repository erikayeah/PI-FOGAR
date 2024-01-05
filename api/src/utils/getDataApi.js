const getDataApi = async (data) => {

   const hpStat = data.stats.find((stat) => stat.stat.name === "hp");
   const hp = hpStat.base_stat;

   const attackStat = data.stats.find((stat) => stat.stat.name === "attack");
   const attack = attackStat.base_stat;

   const defenseStat = data.stats.find((stat) => stat.stat.name === "defense");
   const defense = defenseStat.base_stat;
   
   const speedStat = data.stats.find((stat) => stat.stat.name === "speed");
   const speed = speedStat.base_stat;
   
   let image;

   if (data.id !== null) {
      image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${data.id}.gif`;
    } else {
      image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`;
    }
  
   const typesNames = data.types.map((type) => type.type.name);
   
   
   const pokemonObj = {
     id: data.id,
     name: data.name,
     image: image,
     life: hp,
     attack: attack,
     defense: defense,
     speed: speed,
     height: data.height,
     weight: data.weight,
     types: typesNames // [] 
   };
 
   if (!pokemonObj) throw Error("Error getting data");
   return pokemonObj;
 };
 
 module.exports = getDataApi;