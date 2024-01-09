import styles from "./Card.module.css";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch} from "react-redux";
import { setSelectedPokemon} from "../../redux/actions";
import axios from "axios";

const Card = ({ pokemon }) => {
  const dispatch = useDispatch();
  

  const { id, name, types, image, life, attack, defense, speed, height, weight,
  } = pokemon;

  const handleSeeMoreClick = async () => {
   dispatch(setSelectedPokemon(pokemon));
 };
   
   
   return (
      <div className={styles.container}>
      <h2 className={styles.h2}> {name} </h2>
      <img className={styles.image} src={image} alt={name} />
      <p>Type: {types.join(", ")}</p>
      <Link to={`/pokemon/${id}`}>
        <button className={styles.seeMoreButton} onClick={handleSeeMoreClick}> See more 
     
        </button>
      </Link>
    </div>
  );
};


export default Card;
