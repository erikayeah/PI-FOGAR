import SearchBar from "../searchBar/SearchBar"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../navBar/NavBar.module.css";
import {filterByOrigin, filterByType, sortPokemons, resetFilteredPokemons, fetchPokemons} from '../../redux/actions';



const NavBar = () => {

const dispatch = useDispatch();
const types = useSelector((state) => state.types);


const handleOriginFilter = (event) => {
   const origin = event.target.value;
   if (origin === "ALL") {
      handleClearFilter();
    } else {
   dispatch(filterByOrigin(origin));
};
}

const handleTypeFilter = (event) => {
   const type = event.target.value;
   if (type === "ALL") {
     handleClearFilter();
   } else {
     dispatch(filterByType(type));
   }
 }
 
 const handleClearFilter = () => {
   dispatch(resetFilteredPokemons())
   dispatch(sortPokemons("", ""));
   dispatch(fetchPokemons());
 }

 const handleSortChange = (event) => {
   const value = event.target.value;
   // Dejamos que el valor sea directamente el objeto
   const sortOptions = value !== "" ? JSON.parse(value) : null;
   dispatch(sortPokemons(sortOptions?.sortBy, sortOptions?.sortOrder));
 };

   return (

      <div className = {styles.container}>

      <div className = {styles.searchBar}>

      <Link to={'/home'}>
         <button> Home </button>
         </Link>

         <SearchBar />

         <Link to={'/post'}>
         <button> Create Pokemon </button>
         </Link>

      </div>

      <div className = {styles.containerFilter}>




        <h3>Filter by origin</h3>
        <select onChange={handleOriginFilter}>
          <option value="ALL">ALL</option>
          <option value="API">API</option>
          <option value="DDBB">Database</option>
        </select>

        <h3>Filter by type</h3>
        <select onChange={handleTypeFilter}>
          <option value="ALL">ALL</option>
          {types.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>

     
        <h3>Ordenar</h3>
        <select onChange={handleSortChange}>
  <option value="">Seleccionar</option>
  <option value='{"sortBy": "id", "sortOrder": "asc"}'>Ascendente por ID</option>
  <option value='{"sortBy": "id", "sortOrder": "desc"}'>Descendente por ID</option>
  <option value='{"sortBy": "attack", "sortOrder": "asc"}'>Ascendente por Attack</option>
  <option value='{"sortBy": "attack", "sortOrder": "desc"}'>Descendente por Attack</option>
</select>

      </div>

<div className = {styles.containerReset} >
   <h2> Please, clear filters before a new selection </h2>
    <button onClick = {handleClearFilter} >Reset Filters</button>
</div>

      </div>
   )
}

export default NavBar;