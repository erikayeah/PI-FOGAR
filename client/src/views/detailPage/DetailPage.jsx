// DetailPage.js
import React from "react";
import { useSelector } from "react-redux";
import loadingGif from "../../assets/images/loading.gif";

const DetailPage = () => {
  const selectedPokemon = useSelector((state) => state.selectedPokemon);

 if (!selectedPokemon) {
   return <p> Ups! try again </p>;
 }
  
  return (
    <div>

      <img src={selectedPokemon.image} alt="" />
      <div>
        <h2> {selectedPokemon.name} </h2>
        <h3> ID: {selectedPokemon.id} </h3>
        <h3> Life: {selectedPokemon.life} </h3>
        <h3> Attack: {selectedPokemon.attack} </h3>
        <h3> Defense: {selectedPokemon.defense} </h3>
        <h3> Speed: {selectedPokemon.speed}</h3>
        <h3> Height: {selectedPokemon.height}</h3>
        <h3> Weight: {selectedPokemon.weight}</h3>
        <h3> Types: {selectedPokemon.types.join(", ")} </h3>
      </div>


    </div>
  );
};

export default DetailPage;