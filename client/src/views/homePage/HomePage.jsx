import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/navBar/NavBar";
import Cards from "../../components/cards/Cards";
import Pagination from "../../components/pagination/Pagination";
import Loading from "../../components/loading/Loading";
import { fetchPokemons, fetchTypes, filterByOrigin, sortPokemons } from "../../redux/actions";



const HomePage = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons || []);
  const filteredPokemons = useSelector((state) => state.filteredPokemons);
  const sorted = useSelector((state) => state.sorted);


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
          window.alert("Error al obtener los datos", error);
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

console.log('filteres', filteredPokemons);
console.log('sorted', sorted);

if (filteredPokemons.length > 0 || sorted.length > 0) {
  totalCards = filteredPokemons.length || sorted.length;
  pokemonList = (filteredPokemons.length > 0 ? filteredPokemons : sorted).slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );
} else {
  totalCards = allPokemons.length;
  pokemonList = allPokemons.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);
}



  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <NavBar />
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
