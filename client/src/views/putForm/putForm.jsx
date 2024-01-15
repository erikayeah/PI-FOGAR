import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { putPokemon } from '../../redux/actions'; // Asegúrate de importar la acción necesaria
import validation from '../../utils/validation';
import styles from './PutForm.module.css'; // Asegúrate de tener los estilos adecuados
import validations from '../../utils/validation';


const PureForm = ({ selectedPokemon, onClose }) => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  const [formData, setFormData] = useState({
   name: "",
    image: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: []
    });

    const [errors, setErrors] = useState({
      name: "",
      image: "",
      life: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "type1" || name === "type2") {
        // Si el nombre es 'type1' o 'type2', actualiza 'types' como un nuevo arreglo
        setFormData((prevData) => ({ ...prevData, types: [...prevData.types, value] }));
      } else {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      }
      validateInput(name, value);
    };

    const validateInput = (name, value) => {
      const newErrors = { ...errors };
  
      switch (name) {
        case "name":
        case "image":
        case "life":
        case "attack":
        case "defense":
        case "speed":
        case "height":
        case "weight":
          newErrors[name] = validation({ ...formData, [name]: value })[name];
          break;
        default:
          break;
      }
  
      setErrors(newErrors);
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validation(formData);
    setErrors(formErrors);

    if (Object.values(formErrors).some((error) => error !== '')) {
      // Hay errores en el formulario, puedes mostrarlos o hacer algo más si es necesario
      window.alert('There are errors in the form. Please fix them before submitting.');
      return;
    }

    // Aquí envías la solicitud de actualización al servidor
    dispatch(putPokemon(selectedPokemon.id, formData));

    // Cerrar el formulario o realizar alguna otra acción después de la actualización
    onClose();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name"> Name </label>
          <input
            className={styles.input}
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter name"
            onChange={handleChange}
            required
          />
          <span className={styles.error}>{errors.name && errors.name}</span>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image"> URL image </label>
          <input
            className={styles.input}
            type="text"
            name="image"
            value={formData.image}
            placeholder="Enter URL image"
            onChange={handleChange}
            required
          />
          <span className={styles.error}>{errors.image && errors.image}</span>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="life"> Life </label>
          <input
            className={styles.input}
            type="text"
            name="life"
            value={formData.life}
            placeholder="Enter life"
            onChange={handleChange}
            required
          />
          <span className={styles.error}>{errors.life && errors.life}</span>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="attack"> Attack </label>
          <input
            className={styles.input}
            type="text"
            name="attack"
            value={formData.attack}
            placeholder="Enter attack"
            onChange={handleChange}
            required
          />
          <span className={styles.error}>{errors.attack && errors.attack}</span>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="defense"> Defense </label>
          <input
            className={styles.input}
            type="text"
            name="defense"
            value={formData.defense}
            placeholder="Enter defense"
            onChange={handleChange}
            required
          />
          <span className={styles.error}>{errors.defense && errors.defense}</span>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="speed"> Speed </label>
          <input
            className={styles.input}
            type="text"
            name="speed"
            value={formData.speed}
            placeholder="Optional: enter speed"
            onChange={handleChange}
          />
          <span className={styles.error}>{errors.speed && errors.speed}</span>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="height"> Height </label>
          <input
            className={styles.input}
            type="text"
            name="height"
            value={formData.height}
            placeholder="Optional: enter height"
            onChange={handleChange}
          />
          <span className={styles.error}>{errors.height && errors.height}</span>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="weight"> Weight </label>
          <input
            className={styles.input}
            type="text"
            name="weight"
            value={formData.weight}
            placeholder="Optional: enter weight"
            onChange={handleChange}
          />
          <span className={styles.error}>{errors.weight && errors.weight}</span>
        </div>


        <span> Choose up to 2 types </span>
        <br />
        <select name="type1" value={formData.type1} onChange={handleChange} required>
          <option value="" disabled>
            Select first type
          </option>
          {types.map((type) => (
            <option
              key={type.id}
              value={type.name}
              disabled={formData.types.includes(type.name) || formData.types.length >= 2}
            >
              {type.name}
            </option>
          ))}
        </select>

        <select name="type2" value={formData.type2} onChange={handleChange} disabled={formData.type1 === ""}>
          <option value="" disabled>
            Select second type
          </option>
          <option value="" disabled={formData.type1 === ""}>
            None
          </option>
          {types.map((type) => (
            <option
              key={type.id}
              value={type.name}
              disabled={formData.types.includes(type.name) || formData.types.length >= 2}
            >
              {type.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className={styles.button}
          disabled={Object.values(errors).some((error) => error && error.length > 0)}
        >
          <span className={styles.button_top} onClick={handleSubmit}> Update Pokemon </span>
        </button>

        <button type="button" className={styles.button} onClick={onClose}>
          <span className={styles.button_top}> Cancel </span>
        </button>
      </form>
    </div>
  );
};

export default PureForm;
