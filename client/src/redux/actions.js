// actions.js
import axios from "axios";
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
} from "./action-types";

const URL = 'http://localhost:3001/pokemon'   

//* Get detail by ID
export const setSelectedPokemon = (pokemon) => ({
   type: SET_SELECTED_POKEMON,
   payload: pokemon,
 });

 //* Get by name

 export const searchPokemonByName = (name) => async (dispatch) => {

  try {
    const response = await axios.get(`${URL}/name?name=${name}`);
    const data = response.data
    console.log('data de actionr', data);

    dispatch({ type: SEARCH_POKEMON, payload: data });
    
  } catch (error) {
    alert('Ops, something go wrong', error.message)
    dispatch({ type: SEARCH_POKEMON, payload: [] });
  }
};


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
    const response = await axios.post(`${URL}/post`, pokemonData); //No entra a esta parte, porq no consologuea ningun console log de aca
    // Despacha alguna acción para manejar el resultado (puedes actualizar el estado de los Pokémon)
    dispatch({ type: CREATE_POKEMON_SUCCESS, payload: response.data });
  } catch (error) {
    // Despacha alguna acción para manejar errores
    dispatch(CREATE_POKEMON_ERROR);
  }
};

//* Obtener types
export const fetchTypes = () => async (dispatch) => {
  try {
    const response = await axios.get(`${URL}/type`); // Reemplaza '/api/types' con la ruta correcta de tu API para obtener los types.
    dispatch({ type: FETCH_TYPES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_TYPES_FAILURE, payload: error.message });
  }
};


//* Delete Pokemon

export const deletePokemonSuccess = () => ({
  type: DELETE_POKEMON_SUCCESS,
});

export const deletePokemonFailure = (error) => ({
  type: DELETE_POKEMON_FAILURE,
  payload: error,
});

export const deletePokemon = (id) => async (dispatch) => {
  try {
    await axios.delete(`${URL}/delete/${id}`);
    dispatch(deletePokemonSuccess());
  } catch (error) {
    dispatch(deletePokemonFailure(error.message));
  }
};

//* Filtered by Origin

export const filterByOrigin = (origin) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_BY_ORIGIN,
      payload: origin,
    });
  };
};

//* Filtered by Type

export const filterByType = (pokemonType) => {
  return (dispatch) => {
    if (pokemonType === "ALL") {
      // Si elige "ALL", no aplicar ningún filtro y restablecer el filtro de origen
      dispatch({
        type: FILTER_BY_TYPE,
        payload: null,
      });
    } else {
    dispatch({
      type: FILTER_BY_TYPE,
      payload: pokemonType,
    });
  };
  }}


  //* Reset filter
  export const resetFilteredPokemons = () => ({
    type: RESET_FILTERED_POKEMONS,
  });

  //* Reset NAme
  export const resetName = () => ({
    type: RESET_NAME,
  });

  //* Ordenamiento
  export const sortPokemons = (sortBy, sortOrder) => {
    return {
      type: SORT_POKEMONS,
      payload: { sortBy, sortOrder },
    };
  };