import SearchBar from "../searchBar/SearchBar"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../navBar/NavBar.module.css";

const NavBar = () => {



   return (

      <div className = {styles.container}>

         <SearchBar />

         <Link to={'/post'}>
         <button> Create Pokemon </button>
         </Link>

      </div>
   )
}

export default NavBar;