import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/navBar/NavBar";
import Cards from "../../components/cards/Cards";
import { fetchPokemons } from "../../redux/actions"; 

const HomePage = () => {

  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons || []); // Los 80 primeros pokemones de la api


  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);


  let currentPokemon = []; //Array para pasar a Cards segun corresponda.
  //!  Si por name 1 solo
  
  
  
  //! Si filtrados tal cosa
  
  
  
  //! Si no hay nada de name o filtro, todo
  
  currentPokemon = allPokemons
  
  console.log('que sale en current aca ', currentPokemon);
//* Queda como opcion final, si no hay busqueda de name, si no hay busqueda de filtros seleccionada, que vengan todos




  return (
    <div>
      <NavBar />
      <Cards pokemons = {currentPokemon} />
    </div>
  );
};

export default HomePage;