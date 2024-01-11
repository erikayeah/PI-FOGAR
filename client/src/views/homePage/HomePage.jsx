import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/navBar/NavBar";
import Cards from "../../components/cards/Cards";
import Pagination from "../../components/pagination/Pagination";
import Loading from "../../components/loading/Loading";
import { fetchPokemons } from "../../redux/actions"; 

const cardsPerPage = 12;

const HomePage = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons || []); // Todos los pokemones de la API



  
  let currentPokemon = [];

  const [loading, setLoading]  = useState(true); // Para loading


  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchPokemons());
      } catch (error) {
        window.alert('Error al obtener los datos', error);
        // Manejar el error si es necesario
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

//! logica para traer nombre

//! Logica para traer filtrados


  //! Para todos los pokemons
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  currentPokemon = allPokemons.slice(startIndex, endIndex);

  const totalCards = allPokemons.length; // Usamos la longitud total de todos los pokémons

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
          <Cards pokemons={currentPokemon} />
        </>
      )}
    </div>
  );
};

export default HomePage;
