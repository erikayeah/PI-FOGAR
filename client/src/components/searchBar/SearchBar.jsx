import styles from "../searchBar/SearchBar.module.css"; 



const SearchBar = () => {




   return (
      <div className={styles.container}>

      <input 
      type="text"
      placeholder="Search Pokemon" />

      </div>
   )
}

export default SearchBar;