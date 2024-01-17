import styles from "../searchBar/SearchBar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPokemonByName, resetName } from "../../redux/actions";

const SearchBar = () => {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleSearch = () => {
    if (inputValue.trim() === "") {
      alert("Please enter a name to search");
    } else if (inputValue.trim() !== "") {
      dispatch(searchPokemonByName(inputValue));
      setInputValue("");
      dispatch(resetName());
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleSearch}>
        <span className={styles.button_top}>Search Pokemon</span>
      </button>

      <input
        className={styles.input}
        type="search"
        placeholder="Name"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
