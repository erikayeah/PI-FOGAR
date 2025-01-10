<template>
  <nav class="navbar">
    <div class="nav-left">
      <router-link to="/home" class="nav-logo">
        <img src="../assets/images/pokemon-logo.png" alt="Pokemon Logo" />
      </router-link>
    </div>

    <div class="nav-center">
      <div class="search-container">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search Pokemon..."
          @input="handleSearch"
        />
        <button class="search-button" @click="handleSearch">
          🔍
        </button>
      </div>

      <div class="filters">
        <div class="filter-group">
          <select v-model="selectedType" @change="handleTypeFilter">
            <option value="">Filter by Type</option>
            <option v-for="type in store.types" :key="type.name" :value="type.name">
              {{ type.name }}
            </option>
          </select>

          <select v-model="sortBy" @change="handleSort">
            <option value="">Sort by</option>
            <option value="id">ID</option>
            <option value="attack">Attack</option>
            <option value="defense">Defense</option>
          </select>

          <button class="reset-button" @click="handleReset">
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from "vue";
import { usePokemonStore } from "../stores/pokemon";

export default {
  name: "NavBar",
  setup() {
    const store = usePokemonStore();
    const searchTerm = ref("");
    const selectedType = ref("");
    const sortBy = ref("");

    onMounted(async () => {
      await store.fetchTypes();
    });

    const handleSearch = () => {
      if (searchTerm.value.trim()) {
        store.searchPokemonByName(searchTerm.value);
      } else {
        store.resetFilters();
      }
    };

    const handleTypeFilter = () => {
      if (selectedType.value) {
        store.filterByType(selectedType.value);
        if (sortBy.value) {
          store.sortPokemons(sortBy.value);
        }
      } else {
        store.clearTypeFilter();
      }
    };

    const handleSort = () => {
      if (sortBy.value) {
        store.sortPokemons(sortBy.value);
      }
    };

    const handleReset = () => {
      selectedType.value = "";
      sortBy.value = "";
      store.resetFilters();
    };

    return {
      searchTerm,
      selectedType,
      sortBy,
      store,
      handleSearch,
      handleTypeFilter,
      handleSort,
      handleReset,
    };
  },
};
</script>

<style scoped>
.navbar {
  background-color: #ef5350;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: "VT323", monospace;
}

.nav-logo img {
  height: 40px;
}

.nav-center {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  flex-grow: 1;
  max-width: 600px;
}

.search-container {
  display: flex;
  width: 100%;
  max-width: 400px;
}

.search-container input {
  flex-grow: 1;
  padding: 8px 12px;
  border: 2px solid #fff;
  border-radius: 20px 0 0 20px;
  font-family: "VT323", monospace;
  font-size: 1.1em;
}

.search-button {
  padding: 8px 16px;
  background: #fff;
  border: 2px solid #fff;
  border-radius: 0 20px 20px 0;
  cursor: pointer;
  font-size: 1.1em;
}

.filters {
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: center;
}

.filters select {
  padding: 6px 12px;
  border: 2px solid #fff;
  border-radius: 15px;
  background: white;
  font-family: "VT323", monospace;
  font-size: 1em;
  cursor: pointer;
}

.filter-group {
  display: flex;
  gap: 10px;
  align-items: center;
}

.reset-button {
  padding: 6px 12px;
  border: 2px solid #fff;
  border-radius: 15px;
  background: #fff;
  color: #ef5350;
  font-family: "VT323", monospace;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.create-button {
  background: #fff;
  color: #ef5350;
  padding: 8px 16px;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
}

.create-button:hover {
  background: #f8f8f8;
  transform: translateY(-2px);
}

/* Responsive design */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 0.5rem;
  }

  .nav-center {
    width: 100%;
  }

  .filters {
    flex-direction: column;
    align-items: center;
  }

  .filters select {
    width: 100%;
    max-width: 400px;
  }
}
</style> 