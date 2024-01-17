import styles from "./Card.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPokemon } from "../../redux/actions";
import { resetName } from "../../redux/actions";

const Card = ({ pokemon }) => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.searchResults);

  const {
    id,
    name,
    types,
    image,
    life,
    attack,
    defense,
    speed,
    height,
    weight,
  } = pokemon;

  
  const normalizedTypes = types.map((type) =>
    typeof type === "string" ? { name: type } : type
  );

  const firstType = normalizedTypes.length > 0 ? normalizedTypes[0].name : null;
  const typeNames = normalizedTypes.map((type) => type.name).join(" && ");

  const handleSeeMoreClick = async () => {
    dispatch(setSelectedPokemon(pokemon));
  };
  const handleBack = () => {
    dispatch(resetName());
  };

  return (
    <div
      className={`${styles.container} ${styles[firstType]}`}
      style={{ border: "1px solid #000000" }}
    >
      <h2 className={styles.h2}> {name} </h2>
      <img className={styles.image} src={image} alt={name} />

      <div className={styles.detail}>
        <p> {typeNames}</p>
        <Link to={`/pokemon/${id}`}>
          <button className={styles.button} onClick={handleSeeMoreClick}>
            See more
          </button>
        </Link>

        {Array.isArray(searchResults) && searchResults.length > 0 && (
          <Link to={"/home"}>
            <button className={styles.button} onClick={handleBack}>
              {" "}
              Back{" "}
            </button>
          </Link>
        )}

        {!Array.isArray(searchResults) && searchResults.name && (
          <Link to={"/home"}>
            <button className={styles.button} onClick={handleBack}>
              {" "}
              Back{" "}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Card;
