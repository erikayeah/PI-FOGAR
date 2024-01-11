import SearchBar from "../searchBar/SearchBar"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../navBar/NavBar.module.css";

const NavBar = () => {



   return (

      <div className = {styles.container}>

      <div className = {styles.searchBar}>
         <SearchBar />

         <Link to={'/post'}>
         <button> Create Pokemon </button>
         </Link>

      </div>

      <div className = {styles.containerFilter}>
         <h3>filtro por origen</h3>
         <h3>filtro por type</h3>
         <h3>Ordenar attack aand alfabeto 4 opciones select</h3>

      </div>



      </div>
   )
}

export default NavBar;