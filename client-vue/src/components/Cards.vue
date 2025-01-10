<template>
  <div class="cards-container">
    <div v-if="pokemons.length === 0" class="no-results">
      <h2>No Pokemons Found</h2>
    </div>
    <div v-else class="cards-grid">
      <Card
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";

export default {
  name: "Cards",
  components: {
    Card,
  },
  props: {
    pokemons: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.cards-container {
  width: 100%;
  padding: 20px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  justify-items: center;
}

.no-results {
  text-align: center;
  padding: 40px;
  font-family: "VT323", monospace;
}

.no-results h2 {
  font-size: 2em;
  color: #666;
}

/* Responsive design */
@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .cards-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .cards-container {
    padding: 10px;
  }
}
</style> 