import styles from "../searchBar/SearchBar.module.css"; 
import {useState} from 'react'
import {useDispatch} from 'react-redux'
//! import {searchPokemon} from '../../redux/actions'


const SearchBar = () => {

//!Logica para buscar pokemon segun nombre. 

const dispatch = useDispatch()

const [inputValue, setInputValue] = useState('')

const handleChange = (e) => {
   setInputValue(e.target.value)
}

   return (
      <div className={styles.container}>

      <input 
      type="text"
      placeholder="Search Pokemon" 
      onChange={handleChange}
      />
      

      <button> Search Pokemon </button>

      </div>
   )
}

export default SearchBar;