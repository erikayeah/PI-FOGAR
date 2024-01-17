import SearchBar from "../searchBar/SearchBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../navBar/NavBar.module.css";
import {
  filterByOrigin,
  filterByType,
  sortPokemons,
  resetFilteredPokemons,
  fetchPokemons,
  searchPokemonByName,
} from "../../redux/actions";
import { Link } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  const handleOriginFilter = (event) => {
    const origin = event.target.value;
    if (origin === "ALL") {
      handleClearFilter();
    } else {
      dispatch(filterByOrigin(origin));
    }
  };

  const handleTypeFilter = (event) => {
    const type = event.target.value;
    if (type === "ALL") {
      handleClearFilter();
    } else {
      dispatch(filterByType(type));
    }
  };

  const handleClearFilter = () => {
    dispatch(resetFilteredPokemons());
    //  window.location.reload();
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    // Let the value directly be the object
    const sortOptions = value !== "" ? JSON.parse(value) : null;
    dispatch(sortPokemons(sortOptions?.sortBy, sortOptions?.sortOrder));
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <SearchBar />
        <Link to={"/post"}>
          <button className={styles.buttonCreate}>
            <span className={styles.buttonCreate_top}> Create pokemon </span>
          </button>
        </Link>
      </div>
      <div className={styles.containerReset}></div>

      <div className={styles.divSearchFilter}>
        <div className={styles.divFilter}>
          <div className={styles.divFilter}>
            <div className={styles.containerFilter}>
              <h3 className={styles.h3}>Origin</h3>
              <select className={styles.select} onChange={handleOriginFilter}>
                <option value="ALL">ALL</option>
                <option value="API">API</option>
                <option value="DDBB">Database</option>
              </select>
            </div>

            <div className={styles.containerFilter}>
              <h3 className={styles.h3}>Type</h3>
              <select className={styles.select} onChange={handleTypeFilter}>
                <option value="ALL">ALL</option>
                {types.map((type) => (
                  <option key={type.id} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.containerFilter}>
              <h3 className={styles.h3}>Order</h3>
              <select className={styles.select} onChange={handleSortChange}>
                <option value="">Seleccionar</option>
                <option value='{"sortBy": "id", "sortOrder": "asc"}'>
                  Ascendant by ID
                </option>
                <option value='{"sortBy": "id", "sortOrder": "desc"}'>
                  Descendant by ID
                </option>
                <option value='{"sortBy": "attack", "sortOrder": "asc"}'>
                  Ascendant by Attack
                </option>
                <option value='{"sortBy": "attack", "sortOrder": "desc"}'>
                  Descendantby Attack
                </option>
              </select>
            </div>
            <div className={styles.containerReset}>
              <h2 className={styles.h2}> Reset before new filtering </h2>
              <button className={styles.button} onClick={handleClearFilter}>
                <span className={styles.button_top}>reset filter</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
