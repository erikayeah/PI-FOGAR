import styles from "../searchBar/SearchBar.module.css"; 
import {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {searchPokemonByName} from '../../redux/actions'


const SearchBar = () => {

const dispatch = useDispatch();

const [inputValue, setInputValue] = useState('')

const handleChange = (e) => {
   const {value} = e.target
   setInputValue(value)
}

const handleSearch = () => {
   // Llama a la acción de búsqueda y pasa el valor del input
   dispatch(searchPokemonByName(inputValue));
 };

   return (
      <div className={styles.container}>

      <input 
      type="text"
      placeholder="Search Pokemon" 
      onChange={handleChange}
      />
      

      <button onClick={handleSearch} > Search Pokemon </button>

      </div>
   )
}

export default SearchBar;