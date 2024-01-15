// Card.js

import React from "react";
import styles from "./Prueba.module.css";
import loaderGif from '../../assets/images/loading.gif';

const Card = ({ title, description, image }) => {
  return (
    <div className={styles.cardContainer}>
      <img className={styles.cardImage} src={loaderGif} alt={title} />
      <div className={styles.cardContent}>
        <div className={styles.cardTitle}>NAME</div>
        <div className={styles.cardDescription}>DETALLES</div>
      </div>
    </div>
  );
};

export default Card;
