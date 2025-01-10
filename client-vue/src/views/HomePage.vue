<template>
  <div class="home">
    <NavBar />
    <Notification
      :show="notification.show"
      :message="notification.message"
      :type="notification.type"
      @close="hideNotification"
    />

    <div v-if="loading">
      <Loading />
    </div>

    <div v-else>
      <Cards :pokemons="displayedPokemons" />

      <div class="pagination">
        <button
          class="pagination-button"
          :disabled="currentPage === 1"
          @click="handlePageChange(currentPage - 1)"
        >
          Previous
        </button>
        <span class="page-info">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <button
          class="pagination-button"
          :disabled="currentPage === totalPages"
          @click="handlePageChange(currentPage + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { usePokemonStore } from "../stores/pokemon";
import NavBar from "../components/NavBar.vue";
import Cards from "../components/Cards.vue";
import Loading from "../components/Loading.vue";
import Notification from "../components/Notification.vue";

export default {
  name: "HomePage",
  components: {
    NavBar,
    Cards,
    Loading,
    Notification,
  },
  setup() {
    const store = usePokemonStore();
    const currentPage = ref(1);
    const itemsPerPage = 12;

    onMounted(async () => {
      await store.fetchPokemons();
      await store.fetchTypes();
    });

    const displayedPokemons = computed(() => {
      const pokemons = store.filteredPokemons.length > 0
        ? store.filteredPokemons
        : store.pokemons;

      const startIndex = (currentPage.value - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return pokemons.slice(startIndex, endIndex);
    });

    const totalPages = computed(() => {
      const totalItems = store.filteredPokemons.length > 0
        ? store.filteredPokemons.length
        : store.pokemons.length;
      return Math.ceil(totalItems / itemsPerPage);
    });

    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    };

    return {
      loading: computed(() => store.loading),
      notification: computed(() => store.notification),
      hideNotification: () => store.hideNotification(),
      displayedPokemons,
      currentPage,
      totalPages,
      handlePageChange,
    };
  },
};
</script>

<style scoped>
.home {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
  font-family: "VT323", monospace;
}

.pagination-button {
  padding: 8px 16px;
  background-color: #ef5350;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-family: "VT323", monospace;
  font-size: 1.1em;
  transition: opacity 0.3s ease;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-button:not(:disabled):hover {
  opacity: 0.9;
}

.page-info {
  font-size: 1.2em;
  color: #333;
}

@media (max-width: 768px) {
  .pagination {
    flex-direction: column;
    gap: 10px;
  }
}
</style> 