<template>
  <div class="detail-container">
    <Notification
      :show="notification.show"
      :message="notification.message"
      :type="notification.type"
      @close="hideNotification"
    />

    <div v-if="loading">
      <Loading />
    </div>

    <div v-else-if="pokemon" class="detail-card">
      <div class="header">
        <h1>{{ pokemon.name }}</h1>
        <p class="id">ID: {{ pokemon.id }}</p>
      </div>

      <div class="content">
        <div class="image-container">
          <img :src="pokemon.image" :alt="pokemon.name" />
        </div>

        <div class="info">
          <div class="types">
            <h3>Types:</h3>
            <div class="type-badges">
              <span
                v-for="type in pokemon.types"
                :key="type"
                :class="['type-badge', type]"
              >
                {{ type }}
              </span>
            </div>
          </div>

          <div class="stats">
            <div class="stat-item">
              <span>Life:</span>
              <div class="stat-bar">
                <div
                  class="stat-fill life"
                  :style="{ width: `${(pokemon.life / 150) * 100}%` }"
                >
                  {{ pokemon.life }}
                </div>
              </div>
            </div>

            <div class="stat-item">
              <span>Attack:</span>
              <div class="stat-bar">
                <div
                  class="stat-fill attack"
                  :style="{ width: `${(pokemon.attack / 150) * 100}%` }"
                >
                  {{ pokemon.attack }}
                </div>
              </div>
            </div>

            <div class="stat-item">
              <span>Defense:</span>
              <div class="stat-bar">
                <div
                  class="stat-fill defense"
                  :style="{ width: `${(pokemon.defense / 150) * 100}%` }"
                >
                  {{ pokemon.defense }}
                </div>
              </div>
            </div>

            <div class="stat-item">
              <span>Speed:</span>
              <div class="stat-bar">
                <div
                  class="stat-fill speed"
                  :style="{ width: `${(pokemon.speed / 150) * 100}%` }"
                >
                  {{ pokemon.speed }}
                </div>
              </div>
            </div>
          </div>

          <div class="physical">
            <div class="physical-stat">
              <span>Height:</span>
              <p>{{ pokemon.height }} m</p>
            </div>
            <div class="physical-stat">
              <span>Weight:</span>
              <p>{{ pokemon.weight }} kg</p>
            </div>
          </div>
        </div>
      </div>

      <div class="actions">
        <router-link to="/home" class="button">
          <span class="button_top">Back to Home</span>
        </router-link>
      </div>
    </div>

    <div v-else class="error">
      <h2>Pokemon not found</h2>
      <router-link to="/home" class="button">
        <span class="button_top">Back to Home</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { usePokemonStore } from "../stores/pokemon";
import Loading from "../components/Loading.vue";
import Notification from "../components/Notification.vue";

export default {
  name: "DetailPage",
  components: {
    Loading,
    Notification,
  },
  setup() {
    const route = useRoute();
    const store = usePokemonStore();
    const pokemonId = route.params.id;

    onMounted(async () => {
      await store.fetchPokemonById(pokemonId);
    });

    return {
      loading: computed(() => store.loading),
      pokemon: computed(() => store.selectedPokemon),
      notification: computed(() => store.notification),
      hideNotification: () => store.hideNotification(),
    };
  },
};
</script>

<style scoped>
.detail-container {
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "VT323", monospace;
}

.detail-card {
  background: white;
  border-radius: 15px;
  padding: 20px;
  width: 90%;
  max-width: 1000px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 2.5em;
  margin: 0;
  text-transform: capitalize;
}

.id {
  font-size: 1.2em;
  color: #666;
}

.content {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.image-container {
  flex: 1;
  min-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container img {
  max-width: 100%;
  height: auto;
}

.info {
  flex: 1;
  min-width: 300px;
}

.types {
  margin-bottom: 20px;
}

.type-badges {
  display: flex;
  gap: 10px;
}

.type-badge {
  padding: 5px 15px;
  border-radius: 20px;
  color: white;
  font-size: 1.1em;
  text-transform: capitalize;
}

/* Copiar los estilos de tipos del componente Card.vue */
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
  margin-bottom: 20px;
}

.stat-item {
  margin: 10px 0;
}

.stat-item span {
  display: block;
  margin-bottom: 5px;
  font-size: 1.1em;
}

.stat-bar {
  background: #f0f0f0;
  border-radius: 10px;
  height: 20px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  color: white;
  display: flex;
  align-items: center;
  padding-left: 10px;
  transition: width 0.3s ease;
}

.life { background-color: #ff5959; }
.attack { background-color: #f5ac78; }
.defense { background-color: #fae078; }
.speed { background-color: #fa92b2; }

.physical {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.physical-stat {
  text-align: center;
}

.physical-stat span {
  color: #666;
}

.physical-stat p {
  margin: 5px 0;
  font-size: 1.2em;
}

.actions {
  margin-top: 30px;
  text-align: center;
}

.button {
  display: inline-block;
  text-decoration: none;
}

.button_top {
  display: block;
  padding: 10px 30px;
  border-radius: 20px;
  background-color: #ef5350;
  color: white;
  font-size: 1.1em;
  transition: transform 0.2s;
}

.button:hover .button_top {
  transform: translateY(-2px);
}

.error {
  text-align: center;
  color: #666;
}

@media (max-width: 768px) {
  .detail-card {
    padding: 15px;
  }

  .content {
    flex-direction: column;
  }

  .image-container {
    min-width: auto;
  }

  .info {
    min-width: auto;
  }
}
</style> 