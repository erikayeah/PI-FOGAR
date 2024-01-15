// DetailPage.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./DetailPage.module.css";
import { Link } from "react-router-dom";
import { putPokemon } from "../../redux/actions";
import { useState } from "react";
import PureForm from "../putForm/putForm";

const DetailPage = () => {
  const selectedPokemon = useSelector((state) => state.selectedPokemon);
  //!
  //!
  const dispatch = useDispatch();
  const [isEditing, setEditing] = useState(false);
//!
//!

 if (!selectedPokemon) {
   return <p> Ups! try again </p>;
 }

  // Normalización de la propiedad types
const normalizedTypes = selectedPokemon.types.map((type) =>
typeof type === "string" ? { name: type } : type
);

const typeNames = normalizedTypes.map((type) => type.name).join(", ");

//!

const handleUpdateClick = () => {
  // Habilita la edición
  setEditing(true);
};

const handleFormClose = () => {
  // Deshabilita la edición al cerrar el formulario
  setEditing(false);
};

const handleFormSubmit = (formData) => {
  // Envía la solicitud de actualización al servidor
  dispatch(putPokemon(selectedPokemon.id, formData));

  // Deshabilita la edición después de la actualización
  setEditing(false);
};




return (
  <div className={styles.container}>
    <div className={styles.image}>
      <img src={selectedPokemon.image} alt="" />
      <br />
      <br />
      <Link to={'/home'}>
        <button className={styles.button}>
          <span className={styles.button_top}> Back </span>
        </button>
      </Link>

      <button className={styles.button} onClick={handleUpdateClick}>
        <span className={styles.button_top}> Update </span>
      </button>
    </div>
    <div className={styles.details}>
      {isEditing ? (
        // Renderiza el formulario de edición si está habilitado
        <PureForm
          selectedPokemon={selectedPokemon}
          onClose={handleFormClose}
        />
      ) : (
        // Renderiza los detalles del Pokémon si no está habilitada la edición
        <>
          <h2> {selectedPokemon.name} </h2>
          <h3> ID: {selectedPokemon.id} </h3>
          <h3> Life: {selectedPokemon.life || selectedPokemon.healthPoints} </h3>
          <h3> Attack: {selectedPokemon.attack} </h3>
          <h3> Defense: {selectedPokemon.defense} </h3>
          <h3> Speed: {selectedPokemon.speed || 'unknown'}</h3>
          <h3> Height: {selectedPokemon.height || 'unknown'}</h3>
          <h3> Weight: {selectedPokemon.weight || 'unknown'}</h3>
          <h3> Types: {typeNames} </h3>
        </>
      )}
    </div>
  </div>
);
};

export default DetailPage;