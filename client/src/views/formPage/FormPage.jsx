import styles from "./FormPage.module.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon, fetchTypes } from "../../redux/actions/";
import validation from "../../utils/validation";
import { Link } from "react-router-dom";
import Loading from "../../components/loading/Loading";

const FormPage = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchTypes());
      } catch (error) {
        window.alert("Error: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    totalStats: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "type1" || name === "type2") {
      // Si el nombre es 'type1' o 'type2', actualiza 'types' como un nuevo arreglo
      setFormData((prevData) => ({
        ...prevData,
        types: [...prevData.types, value],
      }));
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
      case "totalStats":
        newErrors[name] = validation({ ...formData, [name]: value })[name];
        break;
      default:
        break;
    }

    const totalStats = ["life", "attack", "defense", "speed"];
    const totalStatsSum = totalStats.reduce((sum, field) => {
      return sum + (formData[field] ? parseFloat(formData[field]) : 0);
    }, 0);

    if (totalStatsSum > 250) {
      newErrors.totalStats =
        "Sum of life, attack, defense and speed cannot exceed 250 in total";
    } else {
      newErrors.totalStats = "";
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formErrors = validation(formData);
      setErrors(formErrors);

      if (Object.values(formErrors).some((error) => error !== "")) {
        window.alert(
          "There are errors in the form. Please fix them before submitting."
        );
        return;
      }

      await dispatch(createPokemon(formData));
      setFormData({
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

      alert("Pokemon created successfully!");
    } catch (error) {
      alert("error en el FRONT", error);
    }
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Link to="/home">
            <button className={styles.button}>
              <span className={styles.button_top}> Back to home </span>
            </button>
          </Link>

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
              <br />
              <span className={styles.error}>
                {" "}
                {errors.name && errors.name}{" "}
              </span>
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
              <br />
              <span className={styles.error}>
                {errors.image && errors.image}
              </span>
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
              <br />
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
              <br />
              <span className={styles.error}>
                {errors.attack && errors.attack}
              </span>
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
              <br />
              <span className={styles.error}>
                {errors.defense && errors.defense}
              </span>
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
              <br />
              <span className={styles.error}>
                {errors.speed && errors.speed}
              </span>

              <span className={styles.error}>
                {errors.totalStats && errors.totalStats}
              </span>
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
              <br />
              <span className={styles.error}>
                {errors.height && errors.height}
              </span>
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
              <br />
              <span className={styles.error}>
                {errors.weight && errors.weight}
              </span>
            </div>

            <span> Choose up to 2 types </span>
            <br />
            <select
              className={styles.select}
              name="type1"
              value={formData.type1}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select first type
              </option>
              {types.map((type) => (
                <option
                  key={type.id}
                  value={type.name}
                  disabled={
                    formData.types.includes(type.name) ||
                    formData.types.length >= 2
                  }
                >
                  {type.name}
                </option>
              ))}
            </select>

            <select
              className={styles.select}
              name="type2"
              value={formData.type2}
              onChange={handleChange}
              disabled={formData.type1 === ""}
            >
              <option value="" disabled>
                Select second type
              </option>
              <option value="" disabled={formData.type1 === ""}>
                {" "}
                None{" "}
              </option>
              {types.map((type) => (
                <option
                  key={type.id}
                  value={type.name}
                  disabled={
                    formData.types.includes(type.name) ||
                    formData.types.length >= 2
                  }
                >
                  {type.name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className={styles.button}
              disabled={Object.values(errors).some(
                (error) => error && error.length > 0
              )}
            >
              <span className={styles.button_top}> Create pokemon </span>
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default FormPage;
