import styles from "./Card.module.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { setSelectedPokemon} from "../../redux/actions";
import { deletePokemon } from '../../redux/actions';
import axios from "axios";

const Card = ({ pokemon }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Cambiar a useNavigate
  

  const { id, name, types, image, life, attack, defense, speed, height, weight,
  } = pokemon;

  const firstType = types && types.length > 0 ? types[0] : null;


  let joinTypes = types.join(', ')

  const handleSeeMoreClick = async () => {
   dispatch(setSelectedPokemon(pokemon));
 };
   
 const handleDelete = async () => {
  try {
    // Lógica para eliminar el Pokémon, por ejemplo, llamada a la acción de Redux
    await dispatch(deletePokemon(pokemon.id));

    // Después de eliminar con éxito, redirige a la página de inicio
    navigate('/home')
  } catch (error) {
    console.error('Error al eliminar el Pokémon', error);
    // Lógica de manejo de errores si es necesario
  }
};
   
   return (
    <div className={`${styles.container} ${styles[firstType]}`}>
      <h2 className={styles.h2}> {name} </h2>
      <img className={styles.image} src={image} alt={name} />
      <p>Type: {joinTypes}</p>
      <Link to={`/pokemon/${id}`}>
        <button className={styles.seeMoreButton} onClick={handleSeeMoreClick}> See more </button>

        {isNaN(pokemon.id) && (
        <button onClick={handleDelete}>Eliminar</button>
      )}


      </Link>
    </div>
  );
};


export default Card;
