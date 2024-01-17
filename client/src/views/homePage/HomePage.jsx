import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/navBar/NavBar";
import Cards from "../../components/cards/Cards";
import Pagination from "../../components/pagination/Pagination";
import Loading from "../../components/loading/Loading";
import { fetchPokemons, fetchTypes } from "../../redux/actions";

const HomePage = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons || []); //Todos los pokemones
  const filteredPokemons = useSelector((state) => state.filteredPokemons);
  const isFilteredOrigin = useSelector((state) => state.isFilteredOrigin);
  const isFilteredType = useSelector((state) => state.isFilteredType);
  const sorted = useSelector((state) => state.sorted);
  const searchResults = useSelector((state) => state.searchResults);

  //* Loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchTypes());

        await dispatch(fetchPokemons());
      } catch (error) {
        window.alert("Error: ", error);
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
    pokemonList = searchResults;
  } else if (
    typeof searchResults === "object" &&
    Object.keys(searchResults).length > 0
  ) {
    pokemonList = [searchResults];
  } else if (isFilteredType || isFilteredOrigin || sorted.length > 0) {
    totalCards = filteredPokemons.length || sorted.length;
    pokemonList = (
      filteredPokemons.length > 0 ? filteredPokemons : sorted
    ).slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);
  } else {
    totalCards = allPokemons.length;
    pokemonList = allPokemons.slice(
      (currentPage - 1) * cardsPerPage,
      currentPage * cardsPerPage
    );
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
