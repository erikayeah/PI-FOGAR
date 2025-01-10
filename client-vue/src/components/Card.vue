<template>
  <div class="card" @click="navigateToDetail">
    <div class="card-header">
      <h2 class="name">{{ pokemon.name }}</h2>
      <p class="id">#{{ pokemon.id }}</p>
    </div>

    <div class="image-container">
      <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" />
    </div>

    <div class="types">
      <span
        v-for="type in pokemon.types"
        :key="type"
        :class="['type-badge', type]"
      >
        {{ type }}
      </span>
    </div>

    <div class="stats">
      <div class="stat">
        <span>Life:</span>
        <span>{{ pokemon.life }}</span>
      </div>
      <div class="stat">
        <span>Attack:</span>
        <span>{{ pokemon.attack }}</span>
      </div>
      <div class="stat">
        <span>Defense:</span>
        <span>{{ pokemon.defense }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "Card",
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();

    const navigateToDetail = () => {
      router.push(`/pokemon/${props.pokemon.id}`);
    };

    return {
      navigateToDetail,
    };
  },
};
</script>

<style scoped>
.card {
  background: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;
  font-family: "VT323", monospace;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.name {
  margin: 0;
  font-size: 1.5em;
  text-transform: capitalize;
}

.id {
  color: #666;
  margin: 0;
}

.image-container {
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.pokemon-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.types {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

.type-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
  text-transform: capitalize;
  color: white;
}

/* Estilos para cada tipo de Pokémon */
.normal { background-color: #A8A878; }
.fire { background-color: #F08030; }
.water { background-color: #6890F0; }
.electric { background-color: #F8D030; }
.grass { background-color: #78C850; }
.ice { background-color: #98D8D8; }
.fighting { background-color: #C03028; }
.poison { background-color: #A040A0; }
.ground { background-color: #E0C068; }
.flying { background-color: #A890F0; }
.psychic { background-color: #F85888; }
.bug { background-color: #A8B820; }
.rock { background-color: #B8A038; }
.ghost { background-color: #705898; }
.dragon { background-color: #7038F8; }
.dark { background-color: #705848; }
.steel { background-color: #B8B8D0; }
.fairy { background-color: #EE99AC; }

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  font-size: 0.9em;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat span:first-child {
  color: #666;
}

.stat span:last-child {
  font-weight: bold;
}
</style> 