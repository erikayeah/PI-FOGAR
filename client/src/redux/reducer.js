// reducer.js
import { FETCH_POKEMONS_SUCCESS, 
  FETCH_POKEMONS_FAILURE, 
  SET_SELECTED_POKEMON,
  CREATE_POKEMON_SUCCESS,
  CREATE_POKEMON_ERROR,
  FETCH_TYPES_SUCCESS, 
  FETCH_TYPES_FAILURE,
  DELETE_POKEMON_SUCCESS, 
  DELETE_POKEMON_FAILURE,
 } from "./action-types";


 const initialState = {
  pokemons: [],
  types: [], // Agrega un array para almacenar los types
  selectedPokemon: null,
  error: null,
  searchResult: {
    data: [], // Almacena los resultados de la búsqueda
    error: null, // Almacena el error si ocurre
  },
};


const reducer = (state = initialState, action) => {

  switch (action.type) {

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

    case SET_SELECTED_POKEMON:
      return {
        ...state,
        selectedPokemon: action.payload,
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
        // Encuentra el índice del Pokémon eliminado en el array actual de pokémons
        const indexToDelete = state.pokemons.findIndex(pokemon => pokemon.id === action.payload.id);
      
        // Si se encuentra el índice, elimina el Pokémon del array
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


    default:
      return state;
  }
};

export default reducer;
