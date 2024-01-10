// reducer.js
import { FETCH_POKEMONS_SUCCESS, 
  FETCH_POKEMONS_FAILURE, 
  SET_SELECTED_POKEMON,
  CREATE_POKEMON_SUCCESS,
  CREATE_POKEMON_ERROR,
  FETCH_TYPES_SUCCESS, 
  FETCH_TYPES_FAILURE,
 } from "./action-types";


 const initialState = {
  pokemons: [],
  types: [], // Agrega un array para almacenar los types
  selectedPokemon: null,
  error: null,
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


    default:
      return state;
  }
};

export default reducer;
