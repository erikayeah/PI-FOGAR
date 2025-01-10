import { defineStore } from "pinia";
import axios from "axios";

const API_URL = import.meta.env.VITE_URL_API;

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    pokemons: [],
    filteredPokemons: [],
    types: [],
    selectedPokemon: null,
    loading: false,
    error: null,
    notification: {
      show: false,
      message: "",
      type: "info",
    },
  }),

  actions: {
    async fetchPokemons() {
      try {
        this.loading = true;
        const response = await axios.get(`${API_URL}/pokemons`);
        this.pokemons = response.data;
      } catch (error) {
        this.error = error.message;
        this.showNotification(error.message, "error");
      } finally {
        this.loading = false;
      }
    },

    async fetchPokemonById(id) {
      try {
        this.loading = true;
        const response = await axios.get(`${API_URL}/pokemons/${id}`);
        this.selectedPokemon = response.data;
      } catch (error) {
        this.error = error.message;
        this.showNotification(error.message, "error");
      } finally {
        this.loading = false;
      }
    },

    async searchPokemonByName(name) {
      try {
        this.loading = true;
        const response = await axios.get(
          `${API_URL}/pokemons/name?name=${name}`
        );
        this.filteredPokemons = Array.isArray(response.data)
          ? response.data
          : [response.data];
      } catch (error) {
        this.error = error.message;
        this.showNotification(error.message, "error");
      } finally {
        this.loading = false;
      }
    },

    async fetchTypes() {
      try {
        this.loading = true;
        const response = await axios.get(`${API_URL}/types`);
        this.types = response.data;
      } catch (error) {
        this.error = error.message;
        this.showNotification(error.message, "error");
      } finally {
        this.loading = false;
      }
    },

    filterByType(type) {
      this.loading = true;
      const filtered = this.pokemons.filter((pokemon) => {
        return pokemon.types.some((t) =>
          typeof t === "string" ? t === type : t.name === type
        );
      });
      this.filteredPokemons = filtered;
      this.loading = false;
    },

    sortPokemons(sortBy, sortOrder = "asc") {
      this.loading = true;
      const pokemonsToSort =
        this.filteredPokemons.length > 0
          ? [...this.filteredPokemons]
          : [...this.pokemons];

      const sorted = pokemonsToSort.sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortBy] - b[sortBy];
        }
        return b[sortBy] - a[sortBy];
      });
      this.filteredPokemons = sorted;
      this.loading = false;
    },

    clearTypeFilter() {
      this.filteredPokemons = [];
    },

    resetFilters() {
      this.filteredPokemons = [];
      return this.fetchPokemons();
    },

    showNotification(message, type = "info") {
      this.notification = {
        show: true,
        message,
        type,
      };
      setTimeout(() => {
        this.hideNotification();
      }, 3000);
    },

    hideNotification() {
      this.notification.show = false;
    },
  },
});
