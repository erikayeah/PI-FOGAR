import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/navBar/NavBar";
import Cards from "../../components/cards/Cards";
import Pagination from "../../components/pagination/Pagination";
// import Prueba from "../../components/PRUEBA/Prueba";
import Loading from "../../components/loading/Loading";
import { fetchPokemons, fetchTypes } from "../../redux/actions";


const HomePage = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons || []); //Todos los pokemones 
  const filteredPokemons = useSelector((state) => state.filteredPokemons); // El resultado de los filtros
  const isFilteredOrigin = useSelector((state) => state.isFilteredOrigin); // El resultado de los filtros
  const isFilteredType = useSelector((state) => state.isFilteredType); // El resultado de los filtros
  const sorted = useSelector((state) => state.sorted); 
  const searchResults = useSelector((state) => state.searchResults); //El resultado de buscar por nombre

  //* Loading
  const [loading, setLoading] = useState(true); // Para loading
  


    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch types
          await dispatch(fetchTypes());
          // Fetch pokemons
          await dispatch(fetchPokemons());
        } catch (error) {
          window.alert("Error: ", error);
          // Manejar el error si es necesario
        } finally {
          setLoading(false);
        }
      };
    
      fetchData();
    }, [dispatch]);

  //* Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;
  const onPageChange = (page) => {
    setCurrentPage(page);
  };


  //* Determine the list to render based on filters and sorting
  let pokemonList = [];
  let totalCards = 0;
  

  if (Array.isArray(searchResults) && searchResults.length > 0) {
    // Desde la DDBB llega como array
    pokemonList = searchResults;
  } else if (typeof searchResults === 'object' && Object.keys(searchResults).length > 0) {
    // Si searchResults es un objeto, considéralo como un solo resultado
    pokemonList = [searchResults];
  } else if (isFilteredType || isFilteredOrigin || sorted.length > 0) {
    // Si hay resultados filtrados o ordenados, úsalos
    totalCards = filteredPokemons.length || sorted.length;
    pokemonList = (filteredPokemons.length > 0 ? filteredPokemons : sorted).slice(
      (currentPage - 1) * cardsPerPage,
      currentPage * cardsPerPage
    );
  } else {
    // Si no hay resultados de búsqueda, filtrado o API, muestra todos los pokemones
    totalCards = allPokemons.length;
    pokemonList = allPokemons.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);
  }

//console.log('chequeo list pokemon', pokemonList);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <NavBar />
          {/* <Prueba/> */}
          <Pagination
            currentPage={currentPage}
            cardsPerPage={cardsPerPage}
            totalCards={totalCards}
            onPageChange={onPageChange}
          />
          <Cards pokemons={pokemonList} />
        </>
      )}
    </div>
  );
};

export default HomePage;
