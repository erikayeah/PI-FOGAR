// actions.js
import axios from "axios";
import {
  FETCH_POKEMONS_SUCCESS,
  FETCH_POKEMONS_FAILURE,
  SET_SELECTED_POKEMON,
} from "./action-types";

const URL = 'http://localhost:3001/pokemon'

//* Get detail bi ID
export const setSelectedPokemon = (pokemon) => ({
   type: SET_SELECTED_POKEMON,
   payload: pokemon,
 });


//* Get pokemons to Home
export const fetchPokemonsSuccess = (pokemons) => ({
  type: FETCH_POKEMONS_SUCCESS,
  payload: pokemons,
});

export const fetchPokemonsFailure = (error) => ({
  type: FETCH_POKEMONS_FAILURE,
  payload: error,
});


export const fetchPokemons = () => {
  return async (dispatch) => {
    try {

      const response = await axios.get(`${URL}`);
      dispatch(fetchPokemonsSuccess(response.data));
    } catch (error) {
      dispatch(fetchPokemonsFailure(error));

    }
  };
};




