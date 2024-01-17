const getDataApi = async (data) => {
  const statsToRetrieve = ["hp", "attack", "defense", "speed"];
  const result = {};

  statsToRetrieve.forEach((statName) => {
    const stat = data.stats.find((s) => s.stat.name === statName);
    result[statName] = stat ? stat.base_stat : null;
  });

  //console.log('result in utils', result);

  const hp = result.hp;
  const attack = result.attack;
  const defense = result.defense;
  const speed = result.speed;

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
    types: typesNames, // An []
  };

  if (!pokemonObj) throw Error("Error getting data");
  return pokemonObj;
};

module.exports = getDataApi;
