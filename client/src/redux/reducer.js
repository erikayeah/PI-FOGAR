// reducer.js
import { FETCH_POKEMONS_SUCCESS, 
  FETCH_POKEMONS_FAILURE, 
  SET_SELECTED_POKEMON,
 } from "./action-types";

 const initialState = {
  pokemons: [], // Cambié el nombre del estado a "pokemons" para reflejar mejor el contenido
  selectedPokemon: null,
  error: null,
  loading: false,
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


    default:
      return state;
  }
};

export default reducer;
