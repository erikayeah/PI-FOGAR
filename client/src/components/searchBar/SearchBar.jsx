import styles from "../searchBar/SearchBar.module.css"; 
import {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {searchPokemonByName, resetName } from '../../redux/actions'



const SearchBar = () => {

const dispatch = useDispatch();

const [inputValue, setInputValue] = useState('')

const handleChange = (e) => {
   const {value} = e.target
   setInputValue(value)
}

const handleSearch = () => {
   // Verifica si el inputValue no está vacío antes de realizar la búsqueda
if (inputValue.trim() === '') {
   alert("Please enter a name to search")
}

   else if (inputValue.trim() !== '') {
     // Llama a la acción de búsqueda y pasa el valor del input
     dispatch(searchPokemonByName(inputValue));
   }
 };

 const clearSearch = () => {
   dispatch(resetName ());
 }

   return (
      <div className={styles.container}>

      <input 
      type="text"
      placeholder="Search Pokemon name" 
      onChange={handleChange}
      />
      

      <button className={styles.button} onClick={handleSearch}>
        <span className={styles.button_top}>Search Pokemon</span>
      </button>

      <button className={styles.button} onClick={clearSearch}>
        <span className={styles.button_top}>Clear search</span>
      </button>


      </div>
   )
}

export default SearchBar;