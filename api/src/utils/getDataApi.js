const getDataApi = async (data) => {

   
   const hpStat = data.stats.find((stat) => stat.stat.name === "hp");
   const hpPoints = hpStat.base_stat;
   
   const attackStat = data.stats.find((stat) => stat.stat.name === "attack");
   const attackPoints = attackStat.base_stat;
   
   const defenseStat = data.stats.find((stat) => stat.stat.name === "defense");
   const defensePoints = defenseStat.base_stat;
   
   const speedStat = data.stats.find((stat) => stat.stat.name === "speed");
   const speedPoints = speedStat.base_stat;
   
   let image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`;
   if (image === null) {
      image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`;
   }
  
   const typesNames = data.types.map((type) => type.type.name);
   
   
   const pokemonObj = {
     id: data.id,
     name: data.name,
     image: image,
     life: hpPoints,
     attack: attackPoints,
     defense: defensePoints,
     speed: speedPoints,
     height: data.height,
     weight: data.weight,
     types: typesNames,
   };
 
   if (!pokemonObj) throw Error("Error getting data");
   return pokemonObj;
 };
 
 module.exports = getDataApi;