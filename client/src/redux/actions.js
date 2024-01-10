// actions.js
import axios from "axios";
import {
  FETCH_POKEMONS_SUCCESS,
  FETCH_POKEMONS_FAILURE,
  SET_SELECTED_POKEMON,
  CREATE_POKEMON_SUCCESS,
  CREATE_POKEMON_ERROR, 
  FETCH_TYPES_SUCCESS,
  FETCH_TYPES_FAILURE
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

//* Creacion pokemon

export const createPokemon = (pokemonData) => async (dispatch) => {
  try {
    // Realiza la solicitud al servidor para crear el Pokémon
    const response = await axios.post(`${URL}/post`, pokemonData);

    // Despacha alguna acción para manejar el resultado (puedes actualizar el estado de los Pokémon)
    dispatch({ type: CREATE_POKEMON_SUCCESS, payload: response.data });
  } catch (error) {
    // Despacha alguna acción para manejar errores
    dispatch({ type: CREATE_POKEMON_ERROR, payload: error.message });
  }
};

//*Obtener typos
export const fetchTypes = () => async (dispatch) => {
  try {
    const response = await axios.get(`${URL}/type`); // Reemplaza '/api/types' con la ruta correcta de tu API para obtener los types.
    dispatch({ type: FETCH_TYPES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_TYPES_FAILURE, payload: error.message });
  }
};



