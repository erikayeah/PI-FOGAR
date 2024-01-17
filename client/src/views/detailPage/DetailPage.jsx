import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./DetailPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PutForm from "../putForm/putForm";
import { deletePokemon } from "../../redux/actions";

const DetailPage = () => {
  const selectedPokemon = useSelector((state) => state.selectedPokemon);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {}, [selectedPokemon]);

  if (!selectedPokemon) {
    return <p> Ups! try again </p>;
  }

  const normalizedTypes = selectedPokemon.types.map((type) =>
    typeof type === "string" ? { name: type } : type
  );

  const typeNames = normalizedTypes.map((type) => type.name).join(" && ");

  const handleUpdateClick = () => {
    setEditing(true);
  };

  const handleFormClose = () => {
    setEditing(false);
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm(
      "You are going to eliminate this pokemon ¿Are you sure?"
    );

    if (isConfirmed) {
      try {
        dispatch(deletePokemon(selectedPokemon.id));
        alert("Pokemon deleted successfully");
        navigate("/home");
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Link to={"/home"}>
          <button className={styles.button}>
            <span className={styles.button_top}> Back </span>
          </button>
        </Link>
        <br />
        <br />
        <img src={selectedPokemon.image} alt="" />
        <br />
        <br />

        {isNaN(selectedPokemon.id) && (
          <button className={styles.button} onClick={handleUpdateClick}>
            <span className={styles.button_top}> Update </span>
          </button>
        )}

        {isNaN(selectedPokemon.id) && (
          <button className={styles.button} onClick={handleDelete}>
            <span className={styles.button_top}> Eliminar </span>
          </button>
        )}
      </div>
      <div className={styles.details}>
        {isEditing ? (
          <PutForm
            selectedPokemon={selectedPokemon}
            onClose={handleFormClose}
          />
        ) : (
          <>
            <h2> {selectedPokemon.name} </h2>
            <h3> ID: {selectedPokemon.id} </h3>
            <h3>
              {" "}
              Life: {selectedPokemon.life || selectedPokemon.healthPoints}{" "}
            </h3>
            <h3> Attack: {selectedPokemon.attack} </h3>
            <h3> Defense: {selectedPokemon.defense} </h3>
            <h3> Speed: {selectedPokemon.speed || "unknown"}</h3>
            <h3> Height: {selectedPokemon.height || "unknown"}</h3>
            <h3> Weight: {selectedPokemon.weight || "unknown"}</h3>
            <h3> Types: {typeNames} </h3>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
