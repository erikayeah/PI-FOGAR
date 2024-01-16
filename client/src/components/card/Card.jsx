import styles from "./Card.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { setSelectedPokemon} from "../../redux/actions";
import { deletePokemon } from '../../redux/actions';

const Card = ({ pokemon }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, name, types, image, life, attack, defense, speed, height, weight,
  } = pokemon;

// Normalización de la propiedad types
const normalizedTypes = types.map((type) =>
typeof type === "string" ? { name: type } : type
);

const firstType = normalizedTypes.length > 0 ? normalizedTypes[0].name : null;
  const typeNames = normalizedTypes.map((type) => type.name).join(" && ");

  const handleSeeMoreClick = async () => {
   dispatch(setSelectedPokemon(pokemon));
 };

//  const handleDelete = () => {
//   // Muestra una alerta de confirmación
//   const isConfirmed = window.confirm("You are going to eliminate this pokemon ¿Are you sure?");
//   // Si el usuario hace clic en "Aceptar", procede con la eliminación
//   if (isConfirmed) {
//     try {

//       dispatch(deletePokemon(pokemon.id));
//       navigate('/home');
//       window.location.reload();
      
//     } catch (error) {
//       console.error('Error al eliminar el Pokémon', error);
//       // Lógica de manejo de errores si es necesario
//     }
//   }
// };



   return (
<div className={`${styles.container} ${styles[firstType]}`} style={{ border: '1px solid #000000' }}>

        <h2 className={styles.h2}> {name} </h2>
        <img className={styles.image} src={image} alt={name} />

        <div  className={styles.detail}>

        <p> {typeNames}</p>
        <Link to={`/pokemon/${id}`}>
          <button className={styles.button} onClick={handleSeeMoreClick}>
            See more
          </button>
        </Link>

        {/* {isNaN(pokemon.id) && (
          <button className={styles.button} onClick={handleDelete}>
            Eliminar
          </button>
        )} */}
        </div>

  </div>
);
        
};

export default Card;
