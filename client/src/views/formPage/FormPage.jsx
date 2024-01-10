import styles from "./FormPage.module.css";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPokemon, fetchTypes } from '../../redux/actions/';




const FormPage = () => {
   
   const dispatch = useDispatch();
   const types = useSelector(state => state.types);


  useEffect(() => {
   const fetchTypesData = async () => {
      await dispatch(fetchTypes());

   };

   fetchTypesData();
}, [dispatch]);
   

   const [formData, setFormData] = useState({
   name: "",
    image: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
    });

    const handleChange = (e) => {
      if (e.target.name === 'type1') {
        setFormData({
          ...formData,
          types: [e.target.value, formData.type2].filter(Boolean),
          [e.target.name]: e.target.value,
        });
      } else if (e.target.name === 'type2') {
        setFormData({
          ...formData,
          types: [formData.type1, e.target.value].filter(Boolean),
          [e.target.name]: e.target.value,
        });
      } else {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createPokemon(formData));
    };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>


        <label htmlFor="name"> Name </label>
        <input 
         type="text" 
         name="name" 
         value={formData.name}
         placeholder="Enter name" 
         onChange={handleChange}
         required
         />

         <label htmlFor="image"> URL image </label>
        <input 
         type="text" 
         name="image" 
         value={formData.image} 
         placeholder="Enter URL image" 
         onChange={handleChange}
         required
         />


         <label htmlFor="life"> Life </label>
          <input 
            type="number" 
            name="life" 
            value={formData.life}
            placeholder="Enter life" 
            onChange={handleChange}
            required
         />

         <label htmlFor="attack"> Attack </label>
        <input 
         type="number" 
         name="attack" 
         value={formData.attack}
         placeholder="Enter attack" 
         onChange={handleChange}
         required
         />

         <label htmlFor="defense"> Defense </label>
        <input 
         type="number" 
         name="defense" 
         value={formData.defense}
         placeholder="Enter defense" 
         onChange={handleChange}
         required
         />

         <label htmlFor="speed"> Speed </label>
        <input 
         type="number" 
         name="speed" 
         value={formData.speed}
         placeholder="Optional: enter speed" 
         onChange={handleChange}
         />

      <label htmlFor="height"> Height </label>
        <input 
         type="number" 
         name="height" 
         value={formData.height}
         placeholder="Optional: enter height" 
         onChange={handleChange}
         />

         <label htmlFor="weight"> Weight </label>
        <input 
         type="number" 
         name="weight" 
         value={formData.weight}
         placeholder="Optional: enter weight" 
         onChange={handleChange}
         />

      <label>Type 1:</label>
      <select name="type1" 
      value={formData.type1} 
      onChange={handleChange} 
      required>

        {types.map((type) => (
          <option key={type.id} value={type.name}>{type.name}</option>
        ))}
      </select>

      <label>Type 2:</label>
      <select name="type2" 
      value={formData.type2} 
      onChange={handleChange}>
        <option value="">None</option>

        {types.map((type) => (
          <option key={type.id} value={type.name}>{type.name}</option>
        ))}
      </select>

      <button type="submit">Create Pokemon</button>

      </form>
    </div>
  );
};

export default FormPage;
