import {
  FETCH_POKEMONS_SUCCESS,
  FETCH_POKEMONS_FAILURE,
  SET_SELECTED_POKEMON,
  CREATE_POKEMON_SUCCESS,
  CREATE_POKEMON_ERROR,
  FETCH_TYPES_SUCCESS,
  FETCH_TYPES_FAILURE,
  DELETE_POKEMON_SUCCESS,
  DELETE_POKEMON_FAILURE,
  FILTER_BY_ORIGIN,
  FILTER_BY_TYPE,
  RESET_FILTERED_POKEMONS,
  SORT_POKEMONS,
  SEARCH_POKEMON,
  RESET_NAME,
  PUT_POKEMON,
  RESET_FILTER,
} from "./action-types";

const initialState = {
  pokemons: [],
  types: [],
  selectedPokemon: null,
  error: null,
  filteredPokemons: [],
  isFiltered: false,
  isFilteredOrigin: false,
  isFilteredType: false,
  sorted: [],
  searchResults: [],
  updatePokemonResult: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //* Put pokemon
    case PUT_POKEMON:
      return {
        ...state,
        updatePokemonResult: action.payload,
      };

    //* Get all pokemons
    case FETCH_POKEMONS_SUCCESS:
      return {
        ...state,
        pokemons: action.payload,
        error: null,
      };

    case FETCH_POKEMONS_FAILURE:
      return {
        ...state,
        pokemons: [],
        error: action.payload,
      };

    //* Get by ID
    case SET_SELECTED_POKEMON:
      return {
        ...state,
        selectedPokemon: action.payload,
      };

    //* Get by name
    case SEARCH_POKEMON:
      return {
        ...state,
        searchResults: action.payload,
      };

    //* Post
    case CREATE_POKEMON_SUCCESS:
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
        error: null,
      };

    case CREATE_POKEMON_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    //* Get types in DDBB
    case FETCH_TYPES_SUCCESS:
      return {
        ...state,
        types: action.payload,
        error: null,
      };

    case FETCH_TYPES_FAILURE:
      return {
        ...state,
        types: [],
        error: action.payload,
      };

    //* Delete pokemon
    case DELETE_POKEMON_SUCCESS:
      const indexToDelete = state.pokemons.findIndex(
        (pokemon) => pokemon.id === action.payload.id
      );

      if (indexToDelete !== -1) {
        const updatedPokemons = [...state.pokemons];
        updatedPokemons.splice(indexToDelete, 1);

        return {
          ...state,
          pokemons: updatedPokemons,
        };
      }

      return state;

    case DELETE_POKEMON_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    //* Filtered
    case FILTER_BY_ORIGIN:
      const filteredByOrigin =
        action.payload === "ALL"
          ? state.pokemons
          : state.pokemons.filter((pokemon) =>
              action.payload === "API"
                ? typeof pokemon.id === "number"
                : typeof pokemon.id === "string"
            );

      return {
        ...state,
        isFiltered: state.isFilteredType || action.payload !== "ALL",
        isFilteredOrigin: action.payload !== "ALL",
        filteredPokemons: state.isFilteredType
          ? state.filteredPokemons.filter((pokemon) =>
              filteredByOrigin.includes(pokemon)
            )
          : filteredByOrigin.length > 0
          ? filteredByOrigin
          : [],
      };

    case FILTER_BY_TYPE:
      const filteredByType =
        action.payload === "ALL"
          ? state.pokemons
          : state.pokemons.filter((pokemon) => {
              if (!pokemon.types) return false;
              return pokemon.types.some((type) =>
                typeof type === "string"
                  ? type === action.payload
                  : type.name === action.payload
              );
            });

      return {
        ...state,
        isFiltered: state.isFilteredOrigin || action.payload !== "ALL",
        isFilteredType: action.payload !== "ALL",
        filteredPokemons: state.isFilteredOrigin
          ? state.filteredPokemons.filter((pokemon) =>
              filteredByType.includes(pokemon)
            )
          : filteredByType.length > 0
          ? filteredByType
          : [],
      };

    /*
  case FILTER_BY_ORIGIN:
    return {
      ...state,
      isFiltered: action.payload !== "ALL",
      filteredPokemons: action.payload === "ALL" ? [] : state.pokemons.filter((pokemon) => (action.payload === "API" ? typeof pokemon.id === "number" : typeof pokemon.id === "string")),
  };

  case FILTER_BY_TYPE:
      return {
        ...state,
        isFiltered: action.payload !== "ALL",
        filteredPokemons: action.payload === "ALL" ? allPokemons : state.pokemons.filter((pokemon) => {
          if (!pokemon.types) return false;
          return pokemon.types.some(
            (type) => (typeof type === "string" ? type === action.payload : type.name === action.payload)
          );
        }),
      };

*/

    //* Reset filter
    case RESET_FILTERED_POKEMONS:
      return {
        ...state,
        isFilteredType: false,
        isFilteredOrigin: false,
        filteredPokemons: [],
        sorted: [],
      };

    case RESET_NAME:
      return {
        ...state,
        searchResults: [],
      };

    //* Ordenamiento
    case SORT_POKEMONS:
      const { sortBy, sortOrder } = action.payload;
      let sortedPokemons = state.isFiltered
        ? [...state.filteredPokemons]
        : [...state.pokemons];

      if (sortBy === "id") {
        sortedPokemons.sort((a, b) => {
          const idA =
            typeof a.id === "string" ? parseInt(a.id.match(/\d+/)[0]) : a.id;
          const idB =
            typeof b.id === "string" ? parseInt(b.id.match(/\d+/)[0]) : b.id;

          return sortOrder === "asc" ? idA - idB : idB - idA;
        });
      } else if (sortBy === "attack") {
        sortedPokemons.sort((a, b) =>
          sortOrder === "asc" ? a.attack - b.attack : b.attack - a.attack
        );
      }

      return {
        ...state,
        filteredPokemons: sortedPokemons,
      };

    default:
      return state;
  }
};

export default reducer;
