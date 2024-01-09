// Cards.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../card/Card";
import styles from "../cards/Cards.module.css";
import { fetchPokemons } from "../../redux/actions"; // Ajusta la ruta según tu estructura de archivos

const Cards = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  const renderCards = () => {
    if (!pokemons || pokemons.length === 0) {
      return <p className={styles.text}>Oh... there is no pokemon to show</p>;
    }

    return pokemons.map((pokemon) => (
      <Card key={pokemon.id} pokemon={pokemon} />
    ));
  };

  return <div className={styles.container}>{renderCards()}</div>;
};

export default Cards;
