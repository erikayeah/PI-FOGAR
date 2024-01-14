// DetailPage.js
import React from "react";
import { useSelector } from "react-redux";
import styles from "./DetailPage.module.css";
import { Link } from "react-router-dom";

const DetailPage = () => {
  const selectedPokemon = useSelector((state) => state.selectedPokemon);

 if (!selectedPokemon) {
   return <p> Ups! try again </p>;
 }
  console.log('en detail', selectedPokemon);

  // Normalización de la propiedad types
const normalizedTypes = selectedPokemon.types.map((type) =>
typeof type === "string" ? { name: type } : type
);

const typeNames = normalizedTypes.map((type) => type.name).join(", ");

  return (
    <div>
      <img src={selectedPokemon.image} alt="" />
      <div>
        <h2> {selectedPokemon.name} </h2>
        <h3> ID: {selectedPokemon.id} </h3>
        <h3> Life: {selectedPokemon.life || selectedPokemon.healthPoints} </h3>
        <h3> Attack: {selectedPokemon.attack} </h3>
        <h3> Defense: {selectedPokemon.defense} </h3>
        <h3> Speed: {selectedPokemon.speed}</h3>
        <h3> Height: {selectedPokemon.height}</h3>
        <h3> Weight: {selectedPokemon.weight}</h3>
        <h3> Types: {typeNames} </h3>
      </div>

      <Link to={'/home'}>
         <button className={styles.button}> 
          <span className={styles.button_top}> Back </span>
         </button>
         </Link>

    </div>
  );
};

export default DetailPage;